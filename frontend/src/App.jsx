import ExpenseForm from "./components/Expense";
import IncomeForm from "./components/Income";
import SummaryForm from "./components/Summary";
import ShowIncomeDetails from "./components/ShowIncomeDetails.jsx";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SignUp.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./context/ContextApi.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./context/protectedRoute.jsx";
import Logout from "./components/LogOut.jsx"

function App() {
  return (
    <Router>
      <div className="card mt-4 p-5 h-100">
        <ContextProvider>
          <h1>Budget Tracker</h1>

          <Routes>
            <Route
              path="/homepage"
              element={
                <>
              <ProtectedRoute>
              <Logout/>
                  <IncomeForm />
                  <ExpenseForm />
                  <SummaryForm />
                  </ProtectedRoute>
                </>
              }
            />
            <Route path="/income-details" element={<ProtectedRoute><ShowIncomeDetails /></ProtectedRoute>} />
            <Route path="/" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </ContextProvider>
      </div>
    </Router>
  );
}

export default App;
