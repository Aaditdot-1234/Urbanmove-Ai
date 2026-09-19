import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { RegisterSchema, LoginSchema, SendOtpSchema, VerifyOtpSchema, ResetPasswordSchema, ChangePasswordSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middleware/authMiddleware";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", validate(RegisterSchema), authController.register);
authRouter.post("/login", validate(LoginSchema), authController.login);
authRouter.post("/logout", authMiddleware, authController.logout);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/send-otp", validate(SendOtpSchema), authController.sendOtp);
authRouter.post("/verify-otp", validate(VerifyOtpSchema), authController.verifyOtp);
authRouter.post("/reset-password", validate(ResetPasswordSchema), authController.resetPassword);
authRouter.post("/change-password", authMiddleware, validate(ChangePasswordSchema), authController.changePassword);

export default authRouter;
