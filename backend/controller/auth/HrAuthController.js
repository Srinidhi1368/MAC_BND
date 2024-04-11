const Hr = require("../../model/users/HrUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const getHR =  async (req, res) => {
  try {
    const { email } = req.query;
    const user = await Hr.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const signUp = async (req, res) => {
  try {
    const { name, email, password, jobTitle, department, companyName } = req.body;

    // Check if email is already registered
    const existingHr = await Hr.findOne({ email });
    if (existingHr) {
      return res.status(400).json({ message: `${email} is already registered` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new HR
    const newHr = new Hr({ name, email, password: hashedPassword, jobTitle, department, companyName });
    await newHr.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newHr._id }, SECRET_KEY, { expiresIn: '2d' });

    return res.status(201).json({
      message: `${name} your account is created successfully`,
      token,
      name,
      email,
      jobTitle,
      department,
      companyName
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const hr = await Hr.findOne({ email });
    if (!hr) {
      return res.status(404).json({ message: "No HR Found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, hr.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: hr._id }, SECRET_KEY, { expiresIn: "2d" });

    return res.status(201).json({
      message: `${hr.name} you have successfully logged In`,
      token,
      name: hr.name,
      email: hr.email,
      jobTitle: hr.jobTitle,
      department: hr.department,
      companyName: hr.companyName,
      userType : 'employee'
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const hr = await Hr.findOne({ email });

    if (!hr) {
      return res.json({ message: "HR is not registered" });
    }

    const token = jwt.sign({ userId: hr._id }, SECRET_KEY, { expiresIn: '5m' });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Reset Password',
      html: `<p>Click <a href="http://localhost:3000/hr/reset-password/${token}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ status: true, message: "Error occurred while sending an email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = await jwt.verify(token, SECRET_KEY);
    const hrId = decoded.userId;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the HR's password
    await Hr.findByIdAndUpdate(hrId, { password: hashedPassword });

    return res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signUp, login, forgotPassword, resetPassword, getHR };
