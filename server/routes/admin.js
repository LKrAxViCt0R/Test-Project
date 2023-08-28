const express = require("express");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let { full_name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const admin = new Admin({
      full_name,
      email,
      password,
    });

    await admin.save();

    return res.status(201).json({
      message: "Admin created successfully",
      admin,
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
    const admin = await Admin.findOne({ email: email });

    if (admin) {
      const verifyUser = await bcrypt.compare(password, admin.password);

      if (verifyUser) {
        const payload = {
          admin: {
            id: admin._id,
            name: User.full_name,
          },
        };

        const token = jwt.sign(payload, "adminauth", { expiresIn: 3600 });

        return res.status(200).json({
          message: "Admin logged In",
          admin: { admin_id: admin._id, email: admin.email },
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
