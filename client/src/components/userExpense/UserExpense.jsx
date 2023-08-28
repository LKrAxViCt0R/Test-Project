import React, { useContext, useEffect, useState } from "react";
import "./userExpense.css";
import { Expense } from "../expense/Expense";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export const UserExpense = () => {
  const [expenseData, setExpenseData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getExpenses();
  }, []);
  const getExpenses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    const userId = localStorage.getItem("user");
    try {
      const res = await axios.get(
        `http://localhost:4000/expense/userexpense/${userId}`
      );
      console.log(res);
      setExpenseData(res.data.expense);
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
      <h1 style={{ textAlign: "center" }}>Your Expenses</h1>
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
              desc={expense.exp_desc}
              date={expense.exp_date}
              amt={expense.amount_spent}
              imgSrc={expense.reciept_image}
              status={expense.exp_status}
              disable={true}
            />
          ))
        ) : (
          <>No Data</>
        )}
      </Container>
      <Link to="/user/expense/add">
        <Fab variant="extended" sx={{marginTop: 2,marginLeft: 3}}>
          <AddIcon sx={{ mr: 1 }} />
          Add Expense
        </Fab>
      </Link>
    </div>
  );
};
