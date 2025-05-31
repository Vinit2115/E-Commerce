package com.vinit.Ecom.repository;

import com.vinit.Ecom.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String>
{
    @Query("{'prodCat': ?0}")
    List<Product> findByCat(String prodCat);
}
