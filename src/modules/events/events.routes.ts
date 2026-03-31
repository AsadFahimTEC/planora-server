import express, { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";

import { eventController } from "./events.controller";

const router = express.Router();

// get the private routes

router.get("/", auth(UserRole.USER, UserRole.ADMIN), eventController.getMyEvents);

router.get("/:id", auth(UserRole.USER, UserRole.ADMIN), eventController.getEventDetails);

router.get("/", auth(UserRole.USER), eventController.getAllEvents);

router.post("/", auth(UserRole.USER, UserRole.ADMIN), eventController.createEvent);

router.post("/:id/join", auth(UserRole.USER, UserRole.ADMIN), eventController.joinEvent);
router.post("/:id/request", auth(UserRole.USER, UserRole.ADMIN), eventController.requestEvent);

router.put("/:id", auth(UserRole.USER, UserRole.ADMIN), eventController.updateEvent);

router.delete("/:id", auth(UserRole.USER, UserRole.ADMIN), eventController.deleteEvent);

export const bookingRouter: Router = router;
