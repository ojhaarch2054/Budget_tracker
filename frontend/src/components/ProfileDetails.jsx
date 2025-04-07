import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfileDetails = () => {
  //to store user details
  const [userDetails, setUserDetails] = useState(null);
  //to track loading status
  const [loading, setLoading] = useState(true);
  //to handle errors
  const [error, setError] = useState(null);
  //destructure
  const { token } = useAuth();
  //initialize navigation function
  const navigate = useNavigate();

  //to fetch user details from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        //get request to fetch user details
        const response = await axiosInstance.get(`/users/${token.userId}`);

        //update state with fetched data
        setUserDetails(response.data);
        //set loading to false after data is fetched
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        //update error state
        setError("Failed to fetch user details.");
        //set loading to false even if there's an error
        setLoading(false);
      }
    };

    //fetch data if the user is authenticated
    if (token) {
      fetchData();
    } else {
      setLoading(false); //stop loading if no token is available
    }
  }, [token]);

  const backBtn = () => {
    navigate("/homepage");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        {userDetails && (
          <div className="text-center">
            <h3 className="mb-4">Hello {userDetails.fullname}, Welcome to your profile</h3>
            <div className="row">
              <div className="col-md-6 text-start">
                <p>
                  <strong>First Name:</strong> {userDetails.fullname}
                </p>
                <p>
                  <strong>Last Name:</strong> {userDetails.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails.email}
                </p>
              </div>
              <div className="col-md-6 text-start">
                <p>
                  <strong>Address:</strong> {userDetails.address}
                </p>
                <p>
                  <strong>Job:</strong> {userDetails.job}
                </p>
                <p>
                  <strong>Phone:</strong> {userDetails.phone}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="text-center mt-4">
          <button className="btn " onClick={backBtn}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
