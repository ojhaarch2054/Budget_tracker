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
import Logout from "./components/LogOut.jsx";
import "./css/body.css";

function App() {
  return (
    <Router>
      <ContextProvider>
        <div className="container mt-4 ">
          <h1 className="text-center mt-1 mb-4">Budget Tracker</h1>
          <Routes>
            <Route
              path="/homepage"
              element={
                <>
                  <ProtectedRoute>
                    <Logout />
                    <div className="row">
                      <div className="col-12 col-lg-4 mb-4">
                        <IncomeForm />
                        <ExpenseForm />
                      </div>
                      <div>
                        <SummaryForm  />
                      </div>
                    </div>
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="/income-details"
              element={
                <ProtectedRoute>
                  <ShowIncomeDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </ContextProvider>
    </Router>
  );
}

export default App;
