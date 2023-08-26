const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    exp_desc: {
      type: String,
      required: true,
    },
    exp_date: {
      type: Date,
      required: true,
    },
    amount_spent: {
      type: Number,
      required: true,
    },
    reciept_image: {
      type: String,
      required: false,
    },
    exp_status: {
      type: String,
    },
  },
  { timestamps: true }
);

exports.Expense = mongoose.model("expense", expenseSchema);
