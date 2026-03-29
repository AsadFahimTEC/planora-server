import express, { Router } from "express";
import  auth, { UserRole } from '../../middlewares/auth';
import { InvitationController } from "./invitation.controller";

const router = express.Router();

router.get("/", auth(UserRole.USER), InvitationController.getAll);
router.get("/:id", auth(UserRole.USER), InvitationController.getById);
router.post("/", auth(UserRole.USER), InvitationController.create);
router.patch("/:id", auth(UserRole.USER), InvitationController.updateStatus);
router.delete("/:id", auth(UserRole.USER), InvitationController.delete);

export const invitationRouter: Router = router;