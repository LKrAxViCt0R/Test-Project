// import React from "react";
// import "./expense.css";

// export const Expense = (props) => {
//   console.log(props)
//   return (
//     <div className="expense-container">
//       <div className="expense-description">
//         <h3>{props.desc}</h3>
//       </div>
//       <div className="expense-date">
//         <p>{props.date}</p>
//       </div>
//       <div className="expense-amt">
//         <p>{`Rs. ${props.amt}`}</p>
//       </div>
//       <div className="reciept-img">
//         <img src={props.imgSrc} alt="receipt_img" />
//       </div>
//       <div className="expense-status">
//         <button disabled={props.disable}>{props.status}</button>
//       </div>
//     </div>
//   );
// };

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./expense.css";
import SplitButton from "../splitButton/SplitButton";

export function Expense(props) {

  const date = new Date(props.date)
  const formattedDate = date.toLocaleDateString('en-GB');

  return (
    <Card sx={{ minWidth: 250, backgroundColor: "#6ccff6"}}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.desc}
        </Typography>
        <Typography variant="body2">{formattedDate}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          ${props.amt}
        </Typography>
        {/* Modal */}
      </CardContent>
      <CardActions>
        {/* group button */}
        <SplitButton id={props.id} disable={props.disable} getExpenses={props.getExpenses} expenseStatus={props.status}/>
      </CardActions>
    </Card>
  );
}
