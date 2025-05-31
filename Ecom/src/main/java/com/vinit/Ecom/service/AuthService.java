package com.vinit.Ecom.service;


import com.vinit.Ecom.dto.SignInDTO;
import com.vinit.Ecom.dto.SignUpDTO;
import com.vinit.Ecom.model.User;
import com.vinit.Ecom.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService
{
    private final UserRepository userRepo;

    public AuthService(UserRepository userRepo)
    {
        this.userRepo=userRepo;
    }

    public String userSignIns(SignInDTO signIn)
    {
        Optional<User> userCheck=userRepo.findByEmail(signIn.getUserEmail());

        if(userCheck.isEmpty())
        {
            return "No such user";
        }

        User user= userCheck.get();
        if(!user.getUserPassword().equals(signIn.getUserPassword()))
        {
            return "Incorrect Password";
        }

        return "Logged in successfully";
    }

    public String userSignUps(SignUpDTO signUp)
    {
        if(userRepo.existByUserEmail(signUp.getUserEmail()))
        {
            return "User already exists!";
        }

        User newUser= new User();

        newUser.setUserName(signUp.getUserName());
        newUser.setUserEmail(signUp.getUserEmail());
        newUser.setUserPassword(signUp.getUserPassword());

        userRepo.save(newUser);
        return "User registered successfully!";
    }
}

