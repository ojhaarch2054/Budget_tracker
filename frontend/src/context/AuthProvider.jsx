import { createContext, useState } from "react";
import axios from "axios";

//context for authentication
const AuthContext = createContext({});

//authprovider component to provide authentication context to its children
export const AuthProvider = ({ children }) => {
    // Function to safely parse JSON
    const safeParseJSON = (item) => {
        try {
            return JSON.parse(item);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return null;
        }
    };
    //to hold authentication information (user and roles)
    const [auth, setAuth] = useState({
        token: localStorage.getItem("token"),
        user: safeParseJSON(localStorage.getItem("user")),
        roles: safeParseJSON(localStorage.getItem("roles")) || [],
    });


    //to handle user logout
    const logout = async () => {
        try {
            //get the token from local storage
            const token = localStorage.getItem('token');
            if (token) {
                //send a post reqst to the logout endpoint with the token in the headers
                await axios.post('http://localhost:3000/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                //clear the auth state and remove the token from local storage
                setAuth({ user: null, roles: [] });
                localStorage.removeItem('token');
                console.log('Logout Successful');
            } else {
                console.log('Token not found');
            }
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    //function to check if the user has a specific role
    const hasRole = (role) => {
        return auth.roles.includes(role);
    };

    //provide the auth state and functions to the children components
    return (
        <AuthContext.Provider value={{ auth, setAuth, hasRole, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;