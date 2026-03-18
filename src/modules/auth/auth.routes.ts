import { authController } from './auth.controller';


import express, { Router } from "express";


const router = express.Router();

router.post("/sign-up/email", authController.register);
router.post("/sign-in/email", authController.login);
router.get("/me", authController.getMe);

export const authRouter: Router = router;