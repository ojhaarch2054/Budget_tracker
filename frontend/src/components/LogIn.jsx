import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogIn = () => {
  //destructure login
  const { logIn } = useAuth();
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

  //to submit login
  const logInSubmit = async (e) => {
    e.preventDefault();
    try {
      //try to login with email and pw
      await logIn(input.email, input.password);
      //if login is succesful navigate to home
      navigate("/homepage");
    } catch (error) {
      //if login is fail send err msg
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
        <small id="emailHelp" className="form-text text-white">
          <br />
          No account? Register here <Link to="/sign-up">Sign Up</Link>
        </small>
      </form>
    </>
  );
};

export default LogIn;
