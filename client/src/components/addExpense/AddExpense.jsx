import React, { useContext, useState } from "react";
import moment from "moment";
import axios from "axios";
import "./addExpense.css";

export const AddExpense = () => {
  const [expensesData, setExpensesData] = useState();
  const [resMessage, setResMessage] = useState("");
  const [formInput, setFormInput] = useState({
    exp_desc: "",
    exp_date: "",
    amount_spent: ""
  });
  const [selectedImgData, setSelectedImgData] = useState(null);
  const [selectedImg1, setSelectedImg1] = useState("");

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

  
  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg1(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImgData(file);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
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

  };

  const saveExpenseData = async (formData) => {
    const userId = localStorage.getItem("user");
    let imageUrl;
    try {
      const apiKey = "4b10ae2f8c724e32c293659abe5af74b";
      const uploadUrl = "https://api.imgbb.com/1/upload";

      const eventData = new FormData();
      eventData.append("key", apiKey);
      eventData.append("image", selectedImgData);
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: eventData,
      });
      if (response.ok) {
        const data = await response.json();
        imageUrl = data.data.url;
        console.log(imageUrl);
      } else {
        console.log(response);
        console.log("Error in uploading poster");
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
    try {
      const expense = {
        exp_desc: formData.exp_desc,
        exp_date: formData.exp_date,
        amount_spent: formData.amount_spent,
        reciept_image: imageUrl
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
      console.log(res);
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
              type="file"
              id="file1"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
};
