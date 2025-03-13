import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //to save user info
  const [user, setUser] = useState(null);
  //to save token
  const [token, setToken] = useState(localStorage.getItem("token"));
  //to save role
  const [role, setRole] = useState(localStorage.getItem("role"));
  //to save refresh token
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  //to handle user login
  const logIn = useCallback(async (email, password) => {
    try {
      //post rqst to the login endpoint
      const response = await axiosInstance.post("/login", { email, password });
      const { data } = response;
      console.log("Login response data:", data);
      //check role from backend and set it to user
      if (data.roles === "user") {
        setUser(data.user);
        setToken(data.token);
        setRole("user");
        setRefreshToken(data.refreshtoken);
        
        //store token and role in cookies
        //set the token cookie with the value of data.token ensuring it is secure and has strict same-site policy
        Cookies.set("token", data.token, { secure: true, sameSite: "strict" });
        Cookies.set("role", "user", { secure: true, sameSite: "strict" });
        Cookies.set("refreshToken", data.refreshtoken, {
          secure: true,
          sameSite: "strict",
        });
        console.log(setUser);
        console.log(setToken);
        console.log(setRefreshToken);
      } else {
        throw new Error("No match role");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, []);

  //to handle user logout
  const logOut = useCallback(() => {
    //clear user and token state
    setUser(null);
    setToken(null);
    setRole(null);
    //remove token from cookies
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("refreshToken");
  }, []); //add empty dependency array to ensure it doesn't change on every render

  //ceate the object of values to provide
  const values = {
    user,
    token,
    role,
    logIn,
    logOut,
    isAuthenticate: !!token, //check if token exists
  };

  return (
    //provide values to the context
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
};

//custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
