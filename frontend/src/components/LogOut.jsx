import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import "../css/logOut.css"

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    //track the logOutStatus
    const [isLoggedOut, setIsLoggedOut] = useState(false);


    const logOutBtn = async () => {
        if (window.confirm("Do you want to logout?")) {
            //call the logout function from AuthContext
            await logout();
            console.log("Logout Successful");
            //check token is cleared or not
            if (!localStorage.getItem('token')) {
                setIsLoggedOut(true);
                //if clear navigate to login page
                navigate('/');
            } else {
                console.error("Token not cleared");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <button onClick={logOutBtn} className="btn logOutbtn w-25 mb-5">
                Logout
            </button>
            {isLoggedOut && <p>You have been logged out successfully.</p>}
            </div>
    );
};

export default Logout;