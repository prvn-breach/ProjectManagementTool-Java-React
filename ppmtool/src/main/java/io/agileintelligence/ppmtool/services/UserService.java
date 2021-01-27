package io.agileintelligence.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.UsernameAlreadyExistsException;
import io.agileintelligence.ppmtool.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;	
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser(User newUser) {
		try {
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			
			// Username has to be unique (exception)
			newUser.setPassword(newUser.getPassword());
			// Make Sure that Password and ConfirmPassword is match
			// We don't persist or show the confirmPassword
			
			return userRepository.save(newUser);
		} catch (Exception e) {
			// TODO: handle exception
			throw new UsernameAlreadyExistsException("Username "+newUser.getUsername()+" already exixsts");
		}
	}
}
