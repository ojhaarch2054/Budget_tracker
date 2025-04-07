import { ContextApi } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axiosInstance from "../utils/axiosInstance";

const ShowIncomeDetails = () => {
  const { incomeState, setIncomeState } = useContext(ContextApi);
  const { token, role } = useAuth();

  const navigate = useNavigate();
  //fetch income data
  useEffect(() => {
    if (!token || role !== "user") {
      navigate("/");
      return;
    }
    const fetchIncome = async () => {
      try {
        //get rqst to fetch income data
        const response = await axiosInstance.get("/income");

        //update state with fetched data
        setIncomeState(response.data);
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
    //fetch data if the user is authenticated and has user role
    if (token && role === "user") {
      fetchIncome();
    }
  }, [setIncomeState, token, role]);

  const goBackBtn = () => {
    navigate("/Homepage");
  };

  return (
    <>
      <button className="btn btn-primary w-25 mb-3" onClick={goBackBtn}>
        Go Back
      </button>
      <div className="right-side">
        <div className="card">
        <div className="card-body">
            {Array.isArray(incomeState) && incomeState.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Income Source</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date received</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeState.map((income) => (
                    <tr key={income.id}>
                      <td>{income.source_name}</td>
                      <td>{income.amount}</td>
                      <td>{income.date_received}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No income data available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowIncomeDetails;
