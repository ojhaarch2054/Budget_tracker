import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  //state for input sections
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    address: "",
    job: "",
    phone: "",
    confirmPassword: "",
  });
  //state to save server response
  const [usersDetails, setUsersDetails] = useState("");

  const handleChange = (e) => {
    //destructure the name and value from the event target
    const { name, value } = e.target;
    //update the state with the new value for input field
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //check if both password fields are filled and their values match
  //1st input.password && input.confirmPassword ensure both password field are filled
  //2nd input.password === input.confirmPassword ensure the values of both password fields match.
  const passwordsMatch =
    input.password &&
    input.confirmPassword &&
    input.password === input.confirmPassword;
    //test password is valid or not
    const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/.test(input.password);
  const signUpSubmit = async (e) => {
    e.preventDefault();
    console.log('signup successfully')
   //check any field in empty or nt
    if (
      !input.name ||
      !input.address ||
      !input.email ||
      !input.lastname ||
      !input.job ||
      !input.phone ||
      !input.confirmPassword
    ) {
      alert("must fill all the field");
      return
    }
    //check if the pw match with confirm pw or not
    if (!passwordsMatch) {
      alert("Passwords do not match");
      return;
    }
    //check the password fulfills the validation criteria or not
    if(!passwordValid){
      alert("password must include one uppercase one lowercase letter one number and one special character and password must have 6 character");
      return
    }
   

   
    try {
      //post rqst to register user
      const response = await axios.post("http://localhost:3000/users", {
        email: input.email,
        password: input.password,
        fullname: input.name,
        lastname: input.lastname,
        address: input.address,
        job: input.job,
        phone: input.phone,
      });
      //show the backend email varification error in frontend
      if(response.status === 400){
        alert(response.data.error);
        //to stop further execution if there is any err
        return
      }
      //update the previous state by adding new added data
      setUsersDetails((prevState) => [...prevState, response.data]);
      setInput({
        name: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
        lastname: "",
        job: "",
        phone: "",
      });
      console.log(input.email + " added");
      navigate('/');
    } catch (error) {
      console.error("Error occurred:", error);
      //if err obj has response and response has data and data has err then display the specific err
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Error occurred while signing up");
      }
    }
  };

  return (
    <>
      <form onSubmit={signUpSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="Enter first name"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Enter last name"
            name="lastname"
            value={input.lastname}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            name="address"
            value={input.address}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="job">Job</label>
          <input
            type="text"
            className="form-control"
            id="job"
            placeholder="Enter jobtitle"
            name="job"
            value={input.job}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="phoneNumber">phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            placeholder="Enter phone number"
            name="phone"
            value={input.phone}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="emailId">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailId"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            placeholder="Re-type Password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <br />
        {passwordsMatch && <p>Passwords match</p>}
        {!passwordsMatch && input.confirmPassword && (
          <p>Passwords do not match</p>
        )}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
