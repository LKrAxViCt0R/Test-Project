const express = require("express");
const { Expense } = require("../models/Expense");
const Auth = require("../middlewares/Auth");
const AdminAuth = require("../middlewares/AdminAuth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    return res.status(200).json({
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.post("/add", Auth, async (req, res) => {
  try {
    let error = "";

    console.log("reached expense add route");
    const { exp_desc, exp_date, amount_spent, reciept_image } = req.body;

    if (exp_desc == "" && error == "") {
      error = "Expense Description missing";
      res.status(400).json({
        message: error,
      });
    }

    const expenseObj = {
      exp_desc,
      exp_date,
      amount_spent,
      reciept_image,
      exp_status: "Pending",
    };

    const expense = new Expense(expenseObj);

    await expense.save();
    return res.status(200).json({
      message: "Expense saved successfully",
      expense,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.put("/update/:id", AdminAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { exp_status } = req.body;

    await Expense.findByIdAndUpdate(id, {
      exp_status,
    });

    return res.status(200).json({
      message: "Data updated successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/expenseId/:expenseId", async (req, res) => {
  try {
    const id = req.params.expenseId;

    const expense = await Expense.findById(id);

    return res.status(200).json({
      message: "Data fetched successfully",
      expense,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/date/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const expenses = await Expense.find({ exp_date: date });

    return res.status(200).json({
      message: "Data fetched successfully",
      expenses,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/amount/:amt", async (req, res) => {
  try {
    const amt = req.params.amt;
    const expenses = await Expense.find({ amount_spent: amt });

    return res.status(200).json({
      message: "Data fetched successfully",
      expenses,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/status/:status", async (req, res) => {
  try {
    const status = req.params.status;
    const expenses = await Expense.find({ exp_status: status });

    return res.status(200).json({
      message: "Data fetched successfully",
      expenses,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = router;
