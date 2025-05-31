package com.vinit.Ecom.service;

import com.vinit.Ecom.model.User;
import com.vinit.Ecom.repository.UserRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService
{
     private final UserRepository userRepo;

     final MongoTemplate mongoTemplate;

     public UserService(UserRepository userRepo, MongoTemplate mongoTemplate)
     {
         this.userRepo=userRepo;
         this.mongoTemplate=mongoTemplate;
     }

     public User addUsers(User user)
     {
         return userRepo.save(user);
     }

     public List<User> getAllUsers()
     {
         return userRepo.findAll();
     }

     public Optional<User> getUsersById(String userId)
     {
         return userRepo.findById(userId);
     }

     public List<User> getUsersByType(String userType)
     {
         return userRepo.findByType(userType);
     }

     public Optional<User> getUsersByEmail(String userEmail)
     {
         return userRepo.findByEmail(userEmail);
     }

     public void updateUsersPassword(String userId, String newPassword)
     {
         Optional<User> userOptional= userRepo.findById(userId);
         if(userOptional.isPresent())
         {
             User user=userOptional.get();
             user.setUserPassword(newPassword);
             userRepo.save(user);
         }

         else
         {
             throw new RuntimeException("User not found of given user id "+userId);
         }
     }

     public void removeUsers(String userId)
     {
         userRepo.deleteById(userId);
     }
}
