import React, { useContext, useEffect } from "react";
import "./userExpense.css";
import { Expense } from "../expense/Expense";
import axios from "axios";
import ExpenseContext from "../../store/ExpenseContext";
import { Link, useNavigate } from "react-router-dom";

export const UserExpense = () => {
  const ExpenseCtx = useContext(ExpenseContext);
  useEffect(() => {
    getExpenses();
  }, [ExpenseCtx.expenses]);
  const getExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/expense");
      ExpenseCtx.setExpenses(res.data.expenses);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="user-expense-container">
      <h1>Your Expenses</h1>
      {ExpenseCtx.expenses.map((expense, index) => (
        <Expense
          key={index}
          desc={expense.exp_desc}
          date={expense.exp_date}
          amt={expense.amount_spent}
          imgSrc={expense.reciept_image}
          status={expense.exp_status}
          disable={true}
        />
      ))}
      <li><Link to="/user/expense/add" >Add Expense</Link></li>
    </div>
  );
};
