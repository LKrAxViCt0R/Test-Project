import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./components/landingPage/Landing";
import { UserExpense } from "./components/userExpense/UserExpense";
import { AddExpense } from "./components/addExpense/AddExpense";
import { AllExpense } from "./components/allExpenses/AllExpense";
import { ExpenseState } from "./store/ExpenseState";
import { AuthStatee } from "./store/AuthStatee";
import NavBar from "./components/navbar/NavBar";
import LoginUserPage from "./components/loginUserPage/loginUserPage";
import LoginAdminPage from "./components/loginAdminPage/LoginAdminPage";

function App() {
  return (
    <div className="App">
      <AuthStatee>
        <ExpenseState>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login/user" element={<LoginUserPage />} />
            <Route path="/login/admin" element={<LoginAdminPage />} />

            <Route path="/user/expense/" element={<UserExpense />} />

            <Route path="/user/expense/add" element={<AddExpense />} />

            <Route path="/admin/expense/" element={<AllExpense />} />
          </Routes>
        </ExpenseState>
      </AuthStatee>
    </div>
  );
}

export default App;
