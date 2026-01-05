package com.vinit.Ecom.controller;

import com.vinit.Ecom.dto.SignInDTO;
import com.vinit.Ecom.dto.SignUpDTO;
import com.vinit.Ecom.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authServ;

    public AuthController(AuthService authServ) {
        this.authServ = authServ;
    }

    @PostMapping("/login")
    public ResponseEntity<String> userSignIn(@RequestBody SignInDTO signIn) {
        return authServ.userSignIns(signIn);
    }

    @PostMapping("/register")
    public ResponseEntity<String> userSignUp(@RequestBody SignUpDTO signUp) {
        return authServ.userSignUps(signUp);
    }
}