import "bootstrap/dist/css/bootstrap.min.css";
import "../css/summary.css";
import { ContextApi } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const SummaryForm = () => {
  const { expenseState, setExpenseState, incomeState, setIncomeState } =
    useContext(ContextApi);
  //destructure the obj
  const { isAuthenticate, role, token } = useAuth();
  //initialize navigation function
  const navigate = useNavigate();

  //useEffect to fetch expense from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        //get rqst to fetch expenses
        const response = await axiosInstance.get("/expenses");

        //update state with fetched data
        setExpenseState(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    //fetch data if the user is authenticated
    if (token) {
      fetchData();
    }
  }, [setExpenseState, token]);

  //fetch income data
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        //get rqst to fetch income
        const response = await axiosInstance.get("/income");
        //update icome state with fetched data
        setIncomeState(response.data);
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
    //fetch data if use is authenticated
    if (token) {
      fetchIncome();
    }
  }, [setIncomeState, token]);

  //for delete btn/ to delete expenses
  const deleteExpenses = (id) => {
    //check user is authenticate or not
    if (!isAuthenticate) {
      alert("You must be logged in to delete expenses");
      return;
    }
    //check if user has user role or not
    if (role !== "user") {
      console.log("Auth roles inside condition:", role);
      alert("You do not have permission to delete expenses");
      return;
    }
    if (window.confirm("Do you want to delete this expense?")) {
      const deleteExp = async () => {
        try {
          //console.log(`Sending delete request for expense id: ${id}`);

          //send dlt rqst to server with expenseid
          await axiosInstance.delete(`/expenses/delete/${id}`);
          //console.log(`Delete request successful for expense id: ${id}`);

          //update the state to remove deleted expenses
          setExpenseState((prevExpenses) => {
            const updatedExpenses = prevExpenses.filter(
              (expense) => expense.expense_id !== id
            );
            return updatedExpenses;
          });
        } catch (error) {
          console.error(
            "Error deleting expense:",
            error.response?.data || error.message
          );
        }
      };
      //call the async fun to delete the expenses
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
    <div className="container summaryContainer">
      <div className="row justify-content-end">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="d-flex justify-content-between flex-wrap">
            <p className="btn btn1 mb-2" onClick={showIncome}>
              Total Income: {totalIncome}
            </p>
            <p className="btn btn1 mb-2">Total Expenses: {totalExpense}</p>
            <p className="btn btn1 mb-2">Budget Left: {budgetLeft}</p>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
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
                              className="btn dltBtn"
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
      </div>
    </div>
  );
};

export default SummaryForm;
