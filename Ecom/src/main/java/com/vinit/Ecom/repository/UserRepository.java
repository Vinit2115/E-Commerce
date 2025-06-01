package com.vinit.Ecom.repository;

import com.vinit.Ecom.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String>
{
    @Query("{'userType': ?0}")
    List<User> findByType(String type);

    @Query("{'userEmail': ?0}")
    Optional<User> findByEmail(String userEmail);

    boolean existsByUserEmail(String userEmail);
}
