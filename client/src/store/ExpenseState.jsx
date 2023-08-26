import React, { useState } from "react";
import ExpenseContext from "./ExpenseContext";

export const ExpenseState = (props) => {
  const [expenses, setExpenses] = useState([]);
  return (
    <ExpenseContext.Provider
      value={{ expenses, setExpenses }}
    >
        {props.children}
    </ExpenseContext.Provider>
  );
};
