package com.vinit.Ecom.controller;

import com.vinit.Ecom.model.Product;
import com.vinit.Ecom.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    private final ProductService prodServ;

    public ProductController(ProductService prodServ) {
        this.prodServ = prodServ;
    }

    /* Fully Working */
    @PostMapping("/add")
    public Product addProd(@RequestBody Product prod) {
        return prodServ.addProducts(prod);
    }

    /* Fully Working */
    @GetMapping
    public List<Product> getAllProd() {
        return prodServ.getAllProducts();
    }

    /* Fully Working */
    @GetMapping("/id/{prodId}")
    public Optional<Product> getProdById(@PathVariable String prodId) {
        return prodServ.getProductsById(prodId);
    }

    /* Fully Working */
    @GetMapping("/category/{prodCat}")
    public List<Product> getProdByCat(@PathVariable String prodCat) {
        return prodServ.getProductsByCategory(prodCat);
    }

    /* Fully Working */
    @DeleteMapping("/delete/{prodId}")
    public void removeProd(@PathVariable String prodId) {
        prodServ.removeProducts(prodId);
    }
}
