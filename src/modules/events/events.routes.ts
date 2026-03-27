import express, { Router } from "express";
import  auth, { UserRole } from '../../middlewares/auth';
import { bookingController } from "./events.controller";

const router = express.Router();

// get the private routes

router.get("/", auth(UserRole.USER), bookingController.getMyBookings);

router.get("/:id", auth(UserRole.USER), bookingController.getBookingDetails);

router.get("/", auth(UserRole.USER), bookingController.getAllTutors);

router.post("/", auth(UserRole.USER), bookingController.createBooking);

router.put("/profiles", auth(UserRole.USER), bookingController.updateTutorProfile);

router.patch("/:id", auth(UserRole.USER), bookingController.cancelBooking);


export const bookingRouter: Router = router;