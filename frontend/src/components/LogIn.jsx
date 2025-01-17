import { useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const logInSubmit = (e) => {
    e.preventDefault();
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
        </div><br />
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
        </div><br />
        <button type="submit" className="btn btn-primary">
          Log In
        </button><br />
        <small id="emailHelp" className="form-text text-muted"><br />
          No account? Register here <Link to="/sign-up">Sign Up</Link>
        </small>
      </form>
    </>
  );
};

export default LogIn;