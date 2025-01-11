import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from "react";
import { ContextApi } from './context/ContextApi';
import axios from 'axios';

const ExpenseForm = () => {
  const { expenseState,setExpenseState } = useContext(ContextApi);
  //for expenseTitle
  const [expenseTitle, setExpenseTitle] = useState('');
  //for expense amt
  const [expenseAmt, setExpenseAmt] = useState('');


  const submitExpenses = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/expenses/add', {
        category: expenseTitle,
        amount: expenseAmt,
        date_paid: new Date().toISOString().split('T')[0]
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