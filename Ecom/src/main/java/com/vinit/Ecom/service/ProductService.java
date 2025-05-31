package com.vinit.Ecom.service;

import com.vinit.Ecom.model.Product;
import com.vinit.Ecom.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService
{

    private final ProductRepository prodRepo;

    public ProductService(ProductRepository prodRepo)
    {
        this.prodRepo=prodRepo;
    }

    public List<Product> getAllProducts()
    {
        return prodRepo.findAll();
    }

    public Optional<Product> getProductsById(String prodId)
    {
        return prodRepo.findById(prodId);
    }

    public List<Product> getProductsByCategory(String prodCat)
    {
        return prodRepo.findByCat(prodCat);
    }

    public Product addProducts(Product prod)
    {
        return prodRepo.save(prod);
    }

    public void removeProducts(String prodId)
    {
        prodRepo.deleteById(prodId);
    }
}

