const mongoose = require("mongoose");

exports.dbConn = async () => {
  try {
    const dbURL =
      "mongodb+srv://vickylakra10:vickylakra10@cluster0.ny2ymmb.mongodb.net/expensedb?retryWrites=true&w=majority";
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");
  } catch (err) {
    console.log(`Database connection error : ${err.message}`);
  }
};
