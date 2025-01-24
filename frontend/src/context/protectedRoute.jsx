import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  //id the user is not authenticated navigate to the login page
  if (!auth.token) {
    return <Navigate to="/" />;
  }
  //if the user is authenticated render the child components
  return children;
};

export default ProtectedRoute;