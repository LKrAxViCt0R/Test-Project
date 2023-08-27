import React, { useEffect, useState } from "react";
import { Expense } from "../expense/Expense";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./allExpenses.css";
import { Container } from "@mui/material";

export const AllExpense = () => {
  const [expenseData, setExpenseData] = useState();
  useEffect(() => {
    getExpenses();
  }, []);
  const navigate = useNavigate();
  const getExpenses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    try {
      const res = await axios.get("http://localhost:4000/expense");
      console.log("data res", res);
      setExpenseData(res.data.expenses);
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
  console.log("data", expenseData);
  return (
    <div className="admin-expense-container">
      <h1 style={{ textAlign: "center" }}>All Expenses</h1>
      <Container
        sx={{
          display: "flex",
          gap: 5,
          margin: 0,
          flexWrap: "wrap",
        }}
      >
        {expenseData && expenseData.length > 0 ? (
          expenseData.map((expense, index) => (
            <Expense
              key={index}
              id = {expense._id}
              desc={expense.exp_desc}
              date={expense.exp_date}
              amt={expense.amount_spent}
              imgSrc={expense.reciept_image}
              status={expense.exp_status}
              disable={false}
              getExpenses={getExpenses}
            />
          ))
        ) : (
          <>No Data</>
        )}
      </Container>
    </div>
  );
};
