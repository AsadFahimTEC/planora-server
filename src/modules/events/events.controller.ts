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
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    const events = await eventService.getMyEvents(userId);

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error: any) {
    console.error("Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
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
    try {
        const userId = req.user!.id;

        const profile = await eventService.updateEvent(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Events updated successfully",
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update event!",
        });
    }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    const deletedEvent = await eventService.deleteEvent(id as string, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  } catch (error: any) {
    console.error("Delete Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const eventController = {
    createEvent,
    getMyEvents,
    getEventDetails,
    getAllEvents, 
    updateEvent,
    deleteEvent
}