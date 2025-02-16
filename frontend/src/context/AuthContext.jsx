import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    //to save user info
    const [user, setUser] = useState(null);
    //to save token
    const [token, setToken] = useState(localStorage.getItem("token"));
    //to save role
    const [role, setRole] = useState(localStorage.getItem("role"))

    //to handle user login
    const logIn = useCallback(async (email, password) => {
        try {
            //post rqst to the login endpoint
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password
            });
            const { data } = response;
            console.log("Login response data:", data);
            //check role from backend and set it to user
            if (data.roles === "user") {
                setUser(data.user);
                setToken(data.token);
                setRole("user");
                //store token and role in local storage
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", "user");
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
        //remove token from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("role");

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
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

//custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);