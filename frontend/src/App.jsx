import ExpenseForm from "./components/Expense";
import IncomeForm from "./components/Income";
import SummaryForm from "./components/Summary";
import ShowIncomeDetails from "./components/ShowIncomeDetails.jsx";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SignUp.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./context/ContextApi.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logout from "./components/LogOut.jsx";
import "./css/body.css";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ContextProvider>
          <div className="container mt-4 ">
            <h1 className="text-center mt-1 mb-4">Budget Tracker</h1>
            <Routes>
              <Route
                path="/homepage"
                element={
                  <>
                    <Logout />
                    <div className="row">
                      <div className="col-12 col-lg-4 mb-4">
                        <IncomeForm />
                        <ExpenseForm />
                      </div>
                      <div>
                        <SummaryForm />
                      </div>
                    </div>
                  </>
                }
              />
              <Route path="/income-details" element={<ShowIncomeDetails />} />
              <Route path="/" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </ContextProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
