package com.vinit.Ecom.dto;


public class SignInDTO
{
    private String userEmail;
    private String userPassword;

    public SignInDTO(){}

    public SignInDTO(String userEmail, String userPassword)
    {
        this.userEmail=userEmail;
        this.userPassword=userPassword;
    }

    public String getUserEmail()
    {
        return userEmail;
    }

    public void serUserEmail(String userEmail)
    {
        this.userEmail=userEmail;
    }

    public String getUserPassword()
    {
        return userPassword;
    }

    public void setUserPassword(String userPassword)
    {
        this.userPassword=userPassword;
    }
}
