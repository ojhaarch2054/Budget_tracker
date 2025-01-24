import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { ContextApi } from "../context/ContextApi";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

const IncomeForm = ({}) => {
  const { setIncomeState } = useContext(ContextApi);
  //for incomeSourseInput
  const [incomeSourceInput, setIncomeSourceInput] = useState("");
  //for amount input
  const [incomeAmountInput, setIncomeAmountInput] = useState("");
  const { auth } = useContext(AuthContext);

  // Add logging to check the auth object
  console.log("Auth object:", auth);

  //to make postRequest
  const submitIncome = async (e) => {
    // Add logging to check the role before the condition
    console.log("Auth role before condition:", auth?.roles);
    //if the user is logged in by verifying the presence of auth and auth.token
    //if the user has the user role
    if (!auth.user || (typeof auth.roles === 'string' ? ![auth.roles].includes("user") : !auth.roles.includes("user"))) {
      console.log("Auth roles inside condition:", auth.roles);
      alert("You do not have permission to add income");
      return;
    }

    try {
      //send reqst to add income
      const response = await axios.post(
        "http://localhost:3000/incomes/add",
        {
          source_name: incomeSourceInput,
          amount: incomeAmountInput,
          date_received: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      //update the previous income state by adding new income
      setIncomeState((prevState) => [...prevState, response.data]);
      //clear input field after adding
      setIncomeAmountInput("");
      setIncomeSourceInput("");
    } catch (error) {
      console.error("Error submitting income:", error);
    }
    alert(incomeAmountInput + " is added to income");
  };

  return (
    <>
      <div className="card w-25">
        <div className="card-header">Add Income</div>
        <div className="card-body">
          <form onSubmit={submitIncome}>
            <label className="card-title">Income Source:</label>
            <br />
            <input
              type="text"
              className="card-text"
              value={incomeSourceInput}
              onChange={(e) => setIncomeSourceInput(e.target.value)}
            />
            <br />
            <label className="card-title">Amount:</label>
            <br />
            <input
              type="number"
              className="card-text"
              value={incomeAmountInput}
              onChange={(e) => setIncomeAmountInput(e.target.value)}
            />
            <br /> <br />
            <button>Add Income</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default IncomeForm;
