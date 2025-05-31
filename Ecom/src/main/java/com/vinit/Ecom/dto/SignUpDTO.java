package com.vinit.Ecom.dto;


public class SignUpDTO
{
    private String userName;
    private String userEmail;
    private String userPassword;

    public SignUpDTO(){}

    public SignUpDTO(String userName, String userEmail, String userPassword)
    {
        this.userName=userName;
        this.userEmail=userEmail;
        this.userPassword=userPassword;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public String getUserEmail()
    {
        return userEmail;
    }

    public void setUserEmail(String userEmail)
    {
        this.userEmail = userEmail;
    }

    public String getUserPassword()
    {
        return userPassword;
    }

    public void setUserPassword(String userPassword)
    {
        this.userPassword = userPassword;
    }
}
