import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login/Login";
import { Landing } from "./components/landingPage/Landing";
import { UserExpense } from "./components/userExpense/UserExpense";
import { AddExpense } from "./components/addExpense/AddExpense";
import { AllExpense } from "./components/allExpenses/AllExpense";
import { ExpenseState } from "./store/ExpenseState";
import { AuthStatee } from "./store/AuthStatee";
import { ProtectRoute } from "./components/admin/ProtectRoute";

function App() {
  return (
    <div className="App">
      <AuthStatee>
        <ExpenseState>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectRoute />}>
              <Route path="/user/expense/" element={<UserExpense />} />
            </Route>
            <Route element={<ProtectRoute />}>
              <Route path="/user/expense/add" element={<AddExpense />} />
            </Route>
            <Route element={<ProtectRoute />}>
              <Route path="/admin/expense/" element={<AllExpense />} />
            </Route>
          </Routes>
        </ExpenseState>
      </AuthStatee>
    </div>
  );
}

export default App;
