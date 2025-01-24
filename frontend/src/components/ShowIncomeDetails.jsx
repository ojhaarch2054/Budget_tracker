import { ContextApi } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const ShowIncomeDetails = () => {
  const { incomeState, setIncomeState } = useContext(ContextApi);
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();
  //fetch income data
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        //get rqst to fetch income data
        const response = await axios.get("http://localhost:3000/income", {
          //added authorization token in headers
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        //update state with fetched data
        setIncomeState(response.data);
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
    //fetch data if the user is authenticated and has user role
    if (auth.token && auth.role === "user") {
      fetchIncome();
    }
  }, [setIncomeState, auth.token, auth.role]);

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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Income Source</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date received</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(incomeState) &&
                  incomeState.map((income) => (
                    <tr key={income.id}>
                      <td>{income.source_name}</td>
                      <td>{income.amount}</td>
                      <td>{income.date_received}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowIncomeDetails;
