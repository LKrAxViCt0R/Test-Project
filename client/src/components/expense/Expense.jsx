import React from "react";
import "./expense.css";

export const Expense = (props) => {
  return (
    <div className="expense-container">
      <div className="expense-description">
        <h3>{props.desc}</h3>
      </div>
      <div className="expense-date">
        <p>{props.date}</p>
      </div>
      <div className="expense-amt">
        <p>{`Rs. ${props.amt}`}</p>
      </div>
      <div className="reciept-img">
        <img src={props.imgSrc} alt="receipt_img" />
      </div>
      <div className="expense-status">
        <button disabled={props.disable}>{props.status}</button>
      </div>
    </div>
  );
};
