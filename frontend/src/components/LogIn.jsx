import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

const LogIn = () => {
  const { setAuth } = useContext(AuthContext);
  //state for input field
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const logInSubmit = async (e) => {
    e.preventDefault();
    try {
      //post rqst
      const response = await axios.post("http://localhost:3000/login", input);
      console.log("Login successful:", response.data);
      //check if the token user and roles are present in the response
      if (response.data.token && response.data.user && response.data.roles) {
        //store JWT token, user and role in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("roles", JSON.stringify(response.data.roles));
        //update auth context with token, user, and roles
        setAuth({
          token: response.data.token,
          user: response.data.user,
          roles: response.data.roles,
        });

        console.log("Auth object after setting:", {
          token: response.data.token,
          user: response.data.user,
          roles: response.data.roles,
        });        
        //default Authorization header for future requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        navigate("/homepage");
      } else {
        console.error("Token is undefined in the response:", response.data);
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <>
      <form onSubmit={logInSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <br />

        <button type="submit" className="btn btn-primary">
          Log In
        </button>
        <br />
        <small id="emailHelp" className="form-text text-muted">
          <br />
          No account? Register here <Link to="/sign-up">Sign Up</Link>
        </small>
      </form>
    </>
  );
};

export default LogIn;
