const HrRoutes = require("express").Router();

const { signUp, login, forgotPassword, resetPassword, getHR, HRupdateUserField } = require("../controller/auth/HrAuthController");
const { upload, uploadProfile } = require("../middleware/fileUploadMiddleware")

HrRoutes.get("/get-hr", getHR);
HrRoutes.post("/signup", upload, signUp);
HrRoutes.post("/login", login);
HrRoutes.post('/forgot-password', forgotPassword)
HrRoutes.post('/reset-password/:token', resetPassword)
HrRoutes.patch('/update-hr/:email', uploadProfile, HRupdateUserField)

module.exports = HrRoutes;
