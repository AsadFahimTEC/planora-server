import express, { Router } from "express";
import  auth, { UserRole } from '../../middlewares/auth';

import { eventController } from "./events.controller";

const router = express.Router();

// get the private routes

// router.get("/", auth(UserRole.USER), eventController.getMyEvents);

// router.get("/:id", auth(UserRole.USER), eventController.getEventDetails);

// router.get("/", auth(UserRole.USER), eventController.getAllEvents);

router.post("/", auth(UserRole.USER), eventController.createEvent);

// router.put("/profiles", auth(UserRole.USER), eventController.updateEventProfile);

// router.patch("/:id", auth(UserRole.USER), eventController.cancelEvent);


export const bookingRouter: Router = router;