import 'bootstrap/dist/css/bootstrap.min.css';
const ExpenseForm = () => {
  return (
    <>
      <div className="card w-25">
        <div className="card-header">Add Expense</div>
        <div className="card-body">
            <form>
                <label className="card-title">Expense Title:</label><br />
                <input type="text" className="card-text" /><br />
                <label className="card-title">Amount:</label><br />
                <input type="number" className="card-text" /><br /> <br />
                <button>Add Expense</button>
            </form>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
