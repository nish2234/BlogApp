import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Login  from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoutes from './component/PrivateRoutes';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';
import  Home  from './pages/Home';
import ReadMore from './pages/ReadMore';
import CtegoryPost from './pages/CtegoryPost';
import UpdatePostPage from './pages/UpdatePostPage';

function App() {
  return (
    <BrowserRouter>
     <ToastContainer/>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/posts/:postId' element={<ReadMore/>}/>
        <Route path='/category/post/:categoryId' element={<CtegoryPost/>}/>
        <Route path='/user' element={<PrivateRoutes/>}>
          <Route path='dashboard' element={<UserDashboard/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='update/:postId' element={<UpdatePostPage/>}/>
        </Route>
     </Routes>
     </BrowserRouter>
  );
}

export default App;
