import { Request, Response } from "express";
import {  eventService } from "./events.service";
import { prisma } from "../../lib/prisma";


const createEvent = async (req: Request, res: Response) => {
  try {

    const event = await eventService.createEvent(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });

  } catch (error: any) {

    console.error("Create Event Error:", error);

    res.status(400).json({
      success: false,
      message: error.message || "Failed to create an event!",
    });
  }
};

const getMyEvents = async (req: Request, res: Response) => {
    const tutors = await eventService.getMyEvents(req.params.id as string);

    res.status(200).json({
        success: true,
        message: "All Events retrieved successfully",
        data: tutors,
    });
};

const getEventDetails = async (req: Request, res: Response) => {
    const booking = await eventService.getEventsById(req.params.id as string);

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: "Event not found",
        });
    }

    res.json({ success: true, data: booking });
};

const getAllEvents = async (req: Request, res: Response) => {
    const tutors = await eventService.getAllEvents();

    res.status(200).json({
        success: true,
        message: "All Events retrieved successfully",
        data: tutors,
    });
};

const updateEvent = async (req: Request, res: Response) => {
  const event = await eventService.updateEvent(
    req.params.id as string,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Event updated",
    data: event,
  });
};

const deleteEvent = async (req: Request, res: Response) => {
  const event = await eventService.deleteEvent(
    req.params.id as string,
    req.user?.id as string
  );

  res.status(200).json({
    success: true,
    message: "Event deleted",
    data: event,
  });
};


export const eventController = {
    createEvent,
    getMyEvents,
    getEventDetails,
    getAllEvents, 
    updateEvent,
    deleteEvent
}