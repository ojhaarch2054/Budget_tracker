import "bootstrap/dist/css/bootstrap.min.css";
import "../css/summary.css";
import { ContextApi } from "./context/ContextApi";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SummaryForm = () => {
  const { expenseState, setExpenseState, incomeState, setIncomeState } =
    useContext(ContextApi);
  const navigate = useNavigate();

  //useEffect to fetch expense from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/expenses");
        setExpenseState(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setExpenseState]);

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

  //for delete btn/ to delete expenses
  const deleteExpenses = (id) => {
    if (window.confirm("Do you want to delete this expense?")) {
      const deleteExp = async () => {
        try {
          //console.log(`Sending delete request for expense id: ${id}`);
          await axios.delete(`http://localhost:3000/expenses/delete/${id}`);
          //console.log(`Delete request successful for expense id: ${id}`);
          setExpenseState((prevExpenses) => {
            const updatedExpenses = prevExpenses.filter(
              (expense) => expense.expense_id !== id
            );
            return updatedExpenses;
          });
        } catch (error) {
            console.error("Error deleting expense:", error.response?.data || error.message);
          }
        }
      deleteExp();
    }
  };

  //to show the income history
  const showIncome = () => {
    navigate("/income-details");
  };
  //add total expense amount
  //ensure expenseState is an array before using reduce
  const totalExpense = Array.isArray(expenseState)
    ? expenseState
        .reduce((sum, expense) => sum + Number(expense.amount), 0)
        .toFixed(2)
    : 0;
  //add total income amount
  const totalIncome = Array.isArray(incomeState)
    ? incomeState
        .reduce((sum, income) => sum + Number(income.amount), 0)
        .toFixed(2)
    : 0;
  //budget left calculation
  const budgetLeft = totalIncome - totalExpense;

  return (
    <div className="container w-75 summaryContainer">
      <div className="right-side">
        <div className="d-flex justify-content-between">
          <p className="btn btn-primary" onClick={showIncome}>
            Total Income: {totalIncome}
          </p>
          <p className="btn btn-primary">Total Expenses: {totalExpense}</p>
          <p className="btn btn-primary">Budget Left: {budgetLeft}</p>
        </div>
        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Expense Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date paid</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(expenseState) &&
                  expenseState.map((expense) => (
                    <tr key={expense.expense_id}>
                      <td>{expense.category}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.date_paid}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteExpenses(expense.expense_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
