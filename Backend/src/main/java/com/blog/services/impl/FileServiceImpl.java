package com.blog.services.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.blog.services.FileService;


@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException{
		
		//file name
		String name = file.getOriginalFilename();
		
		//reanaming filename for file path so there is no files with same name
		String random = UUID.randomUUID().toString();
		String newfile = random.concat(name.substring(name.lastIndexOf(".")));
		
		
		//file path
		String filePath = path+File.separator+newfile;
		
		//create folder if not created
		File f = new File(path);
		if(!f.exists()) {
			f.mkdir();
		}
		
		//copy the file
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		
		return newfile;
	}

	@Override
	public InputStream getImaageResource(String path, String filename) throws FileNotFoundException {
		
	    String fullpath = path+File.separator+filename;
	    InputStream is = new FileInputStream(fullpath);
	    
		return is;
	}

}
