import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from "react"
import { ContextApi } from './context/ContextApi'; 
import axios from 'axios';

const IncomeForm = () => {
  const{setIncomeState} = useContext(ContextApi)
  //for incomeSourseInput
  const[incomeSourceInput, setIncomeSourceInput] = useState('')
//for amount input
const [incomeAmountInput, setIncomeAmountInput] = useState('');

  //to make postRequest
  const submitIncome = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/income/add', {
        source_name: incomeSourceInput,
        amount: incomeAmountInput,
        date_received: new Date().toISOString().split('T')[0]
      });
      setIncomeState(response.data);
      //clear input field after adding
      setIncomeAmountInput('')
      setIncomeSourceInput('')
    } catch (error) {
      console.error('Error submitting income:', error);
    }
    alert(incomeAmountInput + ' is added to income');
  };

  return (
    <>
      <div className="card w-25">
        <div className="card-header">Add Income</div>
        <div className="card-body">
            <form onSubmit={submitIncome}>
                <label className="card-title">Income Source:</label><br />
                <input type="text" className="card-text" value={incomeSourceInput} onChange={(e) => setIncomeSourceInput(e.target.value)} /><br />
                <label className="card-title">Amount:</label><br />
                <input type="number" className="card-text" value={incomeAmountInput} onChange={(e) => setIncomeAmountInput(e.target.value)} /><br /> <br />
                <button>Add Income</button>
            </form>
        </div>
      </div>
    </>
  );
};

export default IncomeForm;