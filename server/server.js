const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const expenseRoutes = require("./routes/expense");
const cors = require('cors');
const { dbConn } = require("./config/db");

const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/expense", expenseRoutes);

dbConn();
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
