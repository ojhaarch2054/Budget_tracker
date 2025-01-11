import { ContextApi } from "./context/ContextApi";
import { useContext, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ShowIncomeDetails = () => {
    const [incomeState, setIncomeState] = useContext(ContextApi);
    const navigate = useNavigate();
    //fetch income data
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get("http://localhost:3000/income");
        setIncomeState(response.data);
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };

    fetchIncome();
  }, [setIncomeState]);

  const goBackBtn = () => {
    navigate("/");
  }

    return(
        <>
        <button className="btn btn-primary w-25 mb-3" onClick={goBackBtn}>Go Back</button>
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
              {Array.isArray(incomeState) && incomeState.map((income) => (
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
    )
}

export default ShowIncomeDetails