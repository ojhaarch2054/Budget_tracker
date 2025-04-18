import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { ContextApi } from "../context/ContextApi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const IncomeForm = ({}) => {
  const { setIncomeState } = useContext(ContextApi);
  //for incomeSourseInput
  const [incomeSourceInput, setIncomeSourceInput] = useState("");
  //for amount input
  const [incomeAmountInput, setIncomeAmountInput] = useState("");
  const { isAuthenticate, role, token } = useAuth();

  //log to check the auth object
  console.log("Auth object:", { isAuthenticate, role, token });

  //to make postRequest
  const submitIncome = async (e) => {
    //redirect if token is missing or role is not user
    if (!token || role !== "user") {
      navigate("/");
      return;
    }

    console.log("Auth role before condition:", role);
    //add logging to check the role before the condition
    console.log("Auth role before condition:", role);
    //if the user has the user role
    if (!isAuthenticate || role !== "user") {
      console.log("Auth roles inside condition:", role);
      alert("You do not have permission to add income");
      return;
    }

    try {
      //send reqst to add income
      const response = await axiosInstance.post("/incomes/add", {
        source_name: incomeSourceInput,
        amount: incomeAmountInput,
        date_received: new Date().toISOString().split("T")[0],
      });
      //update the previous income state by adding new income
      setIncomeState((prevState) => [...prevState, response.data]);
      //clear input field after adding
      setIncomeAmountInput("");
      setIncomeSourceInput("");
      //console.log("Income added successfully:", incomeAmountInput);
      //alert(incomeAmountInput + " is added to income");
    } catch (error) {
      console.error("Error submitting income:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header">Add Income</div>
            <div className="card-body">
              <form onSubmit={submitIncome}>
                <div className="mb-3">
                  <label className="form-label">Income Source:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={incomeSourceInput}
                    onChange={(e) => setIncomeSourceInput(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={incomeAmountInput}
                    onChange={(e) => setIncomeAmountInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Income
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeForm;
