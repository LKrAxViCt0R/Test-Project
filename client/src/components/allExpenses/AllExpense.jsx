import React, { useContext, useEffect, useState } from "react";
import "./allExpenses.css";
import axios from "axios";
import { Expense } from "../expense/Expense";
import ExpenseContext from "../../store/ExpenseContext";
export const AllExpense = () => {
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
    <div className="admin-expense-container">
      <h1>Your Expenses</h1>
      {ExpenseCtx.expenses.map((expense, index) => (
        <Expense
          key={index}
          desc={expense.exp_desc}
          date={expense.exp_date}
          amt={expense.amount_spent}
          imgSrc={expense.reciept_image}
          status={expense.exp_status}
          disable={false}
        />
      ))}
    </div>
  );
};
