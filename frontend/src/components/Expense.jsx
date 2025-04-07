import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState, useEffect } from "react";
import { ContextApi } from '../context/ContextApi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from "react-router-dom";

const ExpenseForm = () => {
  const { expenseState,setExpenseState } = useContext(ContextApi);
  //for expenseTitle
  const [expenseTitle, setExpenseTitle] = useState('');
  //for expense amt
  const [expenseAmt, setExpenseAmt] = useState('');
  const {isAuthenticate, role, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //redirect if token is missing or role is not user
  if (!token || role !== "user") {
    navigate("/");
    return;
  }
  console.log("Auth role before condition:", role);
    if (isAuthenticate && role === 'user') {
      fetchExpenses();
    }
  }, [isAuthenticate, role]);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get('/expenses');
      setExpenseState(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const submitExpenses = async (e) => {
    e.preventDefault();
      if (!isAuthenticate || role !== 'user') {
        alert("You do not have permission to add income");
        return;
      }
    try {
      const response = await axiosInstance.post(
        '/expenses/add',
        {
          category: expenseTitle,
          amount: expenseAmt,
          date_paid: new Date().toISOString().split('T')[0],
        }
      );
      //update the previous state by adding new added data
      setExpenseState(prevState => [...prevState, response.data]);
      //for input field
      setExpenseTitle('');
      setExpenseAmt('');
    } catch (error) {
      console.error('Error submitting expenses:', error);
    }
    alert(expenseAmt + ' is added to expenses');
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header">Add Expense</div>
            <div className="card-body">
              <form onSubmit={submitExpenses}>
                <div className="mb-3">
                  <label className="form-label">Expense Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    value={expenseTitle}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount:</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setExpenseAmt(e.target.value)}
                    value={expenseAmt}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Expense</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;