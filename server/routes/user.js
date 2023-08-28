const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    let { full_name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = new User({
      full_name,
      email,
      password,
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      const verifyUser = await bcrypt.compare(password, user.password);

      if (verifyUser) {
        const payload = {
          user: {
            id: user._id,
            name: user.full_name,
          },
        };

        const token = jwt.sign(payload, "expensetracker", { expiresIn: 3600 });

        return res.status(200).json({
          message: "User logged In",
          user: { user_id: user._id, email: user.email },
          token,
        });
      } else {
        return res.status(401).json({
          message: "Wrong Username/Password",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
