package com.vinit.Ecom.model;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String userId;
    private String userPassword;
    @NotEmpty
    private String userName;
    @NotEmpty
    private String userType;
    private int userNumber;
    @Email
    @NotEmpty
    private String userEmail;

    public User(){}

    public User(String userPassword, String userName, String userType, int userNumber, String userEmail){
        this.userPassword=userPassword;
        this.userName=userName;
        this.userType=userType;
        this.userNumber=userNumber;
        this.userEmail=userEmail;
    }

    public String getUserId() {
        return userId;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public int getUserNumber() {
        return userNumber;
    }

    public void setUserNumber(int userNumber) {
        this.userNumber = userNumber;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}

