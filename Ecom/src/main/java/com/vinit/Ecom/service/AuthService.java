package com.vinit.Ecom.service;


import com.vinit.Ecom.dto.SignInDTO;
import com.vinit.Ecom.dto.SignUpDTO;
import com.vinit.Ecom.model.Role;
import com.vinit.Ecom.model.User;
import com.vinit.Ecom.repository.UserRepository;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;

@Service
public class AuthService
{
    private final UserRepository userRepo;

    public AuthService(UserRepository userRepo)
    {
        this.userRepo=userRepo;
    }

    public ResponseEntity<String> userSignIns(SignInDTO signIn)
    {
        Optional<User> userCheck=userRepo.findByEmail(signIn.getUserEmail());

        if(userCheck.isEmpty())
        {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }

        User user= userCheck.get();
        if(!user.getUserPassword().equals(signIn.getUserPassword()))
        {
            return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>("Logged in successfully", HttpStatus.OK);
    }

    public ResponseEntity<String> userSignUps(SignUpDTO signUp)
    {
        if(userRepo.existsByUserEmail(signUp.getUserEmail()))
        {
            return new ResponseEntity<>("User already exists!",HttpStatus.CONFLICT);
        }

        User newUser= new User();

        newUser.setUserName(signUp.getUserName());
        newUser.setUserEmail(signUp.getUserEmail());
        newUser.setUserPassword(signUp.getUserPassword());
        newUser.setRole(Role.USER);

        userRepo.save(newUser);
        return new ResponseEntity<>("Successfully Registered!", HttpStatus.CREATED);
    }
}

