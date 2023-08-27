import React, { useContext, useState } from "react";
import moment from "moment";
import "./addExpense.css";
import axios from "axios";
import ExpenseContext from "../../store/ExpenseContext";


export const AddExpense = () => {
  const ExpenseCtx = useContext(ExpenseContext);
  const [resMessage, setResMessage] = useState("");
  const [formInput, setFormInput] = useState({
    exp_desc: "",
    exp_date: "",
    amount_spent: "",
    reciept_image: "",
  });

  const descHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        exp_desc: event.target.value,
      };
    });
  };

  const dateHandler = (event) => {
    const newDate = moment(new Date(event.target.value)).format("YYYY-MM-DD");
    setFormInput((prevState) => {
      return {
        ...prevState,
        exp_date: newDate,
      };
    });
  };

  const amtHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        amount_spent: event.target.value,
      };
    });
  };

  const imgHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        reciept_image: event.target.value,
      };
    });
  };

  const formSubmitHandler = async (event) => {
    let error = "";
    if (formInput.exp_desc === "" && error === "") {
      error = "Please enter expense description";
      setResMessage(error);
    }
    if (formInput.exp_date === "" && error === "") {
      error = "Please enter expense date";
      setResMessage(error);
    }
    if (formInput.amount_spent === "" && error === "") {
      error = "Please enter expense amount";
      setResMessage(error);
    }
    if (error === "") await saveExpenseData(formInput);

    event.preventDefault();
  };

  const saveExpenseData = async (formData) => {
    const userId = localStorage.getItem("user");
    try {
      const expense = {
        exp_desc: formData.exp_desc,
        exp_date: formData.exp_date,
        amount_spent: formData.amount_spent,
        reciept_image: formData.reciept_image,
      };

      const res = await axios.post(
        `http://localhost:4000/expense/add/${userId}/`,
        expense,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      ExpenseCtx.setExpenses([...ExpenseCtx.expenses, expense]);
      setResMessage("");
      console.log(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="expense-add-container">
      <h1>Add Expense</h1>
      <h3>{resMessage}</h3>
      <div className="add-form-container">
        <form onSubmit={formSubmitHandler}>
          <div className="form-input">
            <input
              type="text"
              placeholder="Expense Description"
              onChange={descHandler}
            />
          </div>
          <div className="form-input">
            <input type="date" placeholder="Date" onChange={dateHandler} />
          </div>
          <div className="form-input">
            <input
              type="text"
              placeholder="Expense Amount"
              onChange={amtHandler}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              placeholder="Reciept Image"
              onChange={imgHandler}
            />
          </div>
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
};
