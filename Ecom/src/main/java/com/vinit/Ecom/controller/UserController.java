package com.vinit.Ecom.controller;

import com.vinit.Ecom.model.User;
import com.vinit.Ecom.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController
{
        private final UserService userServ;

        public UserController(UserService userServ)
        {
            this.userServ = userServ;
        }

        /*Fully Working*/
        @PostMapping("/add")
        public User addUser(@RequestBody User user)
        {
            return userServ.addUsers(user);
        }

        /*Fully Working*/
        @GetMapping()
        public List<User> getAllUser()
        {
            return userServ.getAllUsers();
        }

        /*Fully Working*/
        @GetMapping("/id/{userId}")
        public Optional<User> getUserById(@PathVariable String userId)
        {
            return userServ.getUsersById(userId);
        }

        /*Fully Working*/
        @GetMapping("/type/{userType}")
        public List<User> getUserByType(@PathVariable String userType)
        {
            return userServ.getUsersByType(userType);
        }

        /*Fully Working*/
        @GetMapping("/email/{userEmail}")
        public Optional<User> getUserByEmail(@PathVariable String userEmail)
        {
            return userServ.getUsersByEmail(userEmail);
        }

        /*Fully Working*/
        @PutMapping("/update-password/{userId}")
        public String updateUserPassword(@PathVariable String userId, @RequestParam String newPassword)
        {
            userServ.updateUsersPassword(userId, newPassword);
            return "Password Updated";
        }

        /*Fully Working*/
        @DeleteMapping("/delete/{userId}")
        public String removeUser(@PathVariable String userId)
        {
            userServ.removeUsers(userId);
            return "User Deleted!";
        }
}
