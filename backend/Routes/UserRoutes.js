const userRoutes = require("express").Router();
const multer = require("multer");
const { signUp, login, forgotPassword, resetPassword, getUser, updateUserField } = require("../controller/auth/AuthController");
const { upload, uploadProfile } = require("../middleware/fileUploadMiddleware");
const User = require("../model/users/UserModel");

userRoutes.get('/user', getUser)
userRoutes.post("/signup", upload, signUp);
userRoutes.post("/login", login);
userRoutes.post('/forgot-password', forgotPassword)
userRoutes.post('/reset-password/:token', resetPassword)
userRoutes.put('/update-user/:email', uploadProfile, updateUserField)

module.exports = userRoutes;
