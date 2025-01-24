import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState, useEffect } from "react";
import { ContextApi } from '../context/ContextApi';
import axios from 'axios';
import AuthContext from "../context/AuthProvider";

const ExpenseForm = () => {
  const { expenseState,setExpenseState } = useContext(ContextApi);
  //for expenseTitle
  const [expenseTitle, setExpenseTitle] = useState('');
  //for expense amt
  const [expenseAmt, setExpenseAmt] = useState('');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.token && auth.role === 'user') {
      fetchExpenses();
    }
  }, [auth.token, auth.role]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expenses', {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setExpenseState(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const submitExpenses = async (e) => {
    e.preventDefault();
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
      const response = await axios.post('http://localhost:3000/expenses/add', {
        category: expenseTitle,
        amount: expenseAmt,
        date_paid: new Date().toISOString().split('T')[0]
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
    });
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
    <>
      <div className="card w-25">
        <div className="card-header">Add Expense</div>
        <div className="card-body">
            <form onSubmit={submitExpenses}>
                <label className="card-title">Expense Title:</label><br />
                <input type="text" className="card-text" onChange={(e) => setExpenseTitle(e.target.value)} value={expenseTitle} /><br />
                <label className="card-title">Amount:</label><br />
                <input type="number" className="card-text" onChange={(e) => setExpenseAmt(e.target.value)} value={expenseAmt} /><br /> <br />
                <button>Add Expense</button>
            </form>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;