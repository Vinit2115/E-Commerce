package com.vinit.Ecom.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
    @Id
    private final String prodId;
    private String prodName;
    private String prodCat;
    private double prodPrice;
    private String prodDesc;
    private String prodImage;

    public Product(String prodId, String prodName, String prodCat, double prodPrice, String prodDesc,
            String prodImage) {
        this.prodId = prodId;
        this.prodName = prodName;
        this.prodCat = prodCat;
        this.prodPrice = prodPrice;
        this.prodDesc = prodDesc;
        this.prodImage = prodImage;
    }

    public String getProdId() {
        return prodId;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public String getProdCat() {
        return prodCat;
    }

    public void setProdCat(String prodCat) {
        this.prodCat = prodCat;
    }

    public double getProdPrice() {
        return prodPrice;
    }

    public void setProdPrice(double prodPrice) {
        this.prodPrice = prodPrice;
    }

    public String getProdDesc() {
        return prodDesc;
    }

    public void setProdDesc(String prodDesc) {
        this.prodDesc = prodDesc;
    }

    public String getProdImage() {
        return prodImage;
    }

    public void setProdImage(String prodImage) {
        this.prodImage = prodImage;
    }
}
