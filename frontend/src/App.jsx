import ExpenseForm from "./components/Expense";
import IncomeForm from "./components/Income";
import SummaryForm from "./components/Summary";
import ShowIncomeDetails from "./components/ShowIncomeDetails.jsx";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SignUp.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./components/context/ContextApi.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="card mt-4 p-5 h-100">
        <ContextProvider>
          <Routes>
            <Route
              path="/homepage"
              element={
                <>
                  <IncomeForm />
                  <ExpenseForm />
                  <SummaryForm />
                </>
              }
            />
            <Route path="/income-details" element={<ShowIncomeDetails />} />
            <Route path="/" element={<LogIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
          </Routes>
        </ContextProvider>
      </div>
    </Router>
  );
}

export default App;