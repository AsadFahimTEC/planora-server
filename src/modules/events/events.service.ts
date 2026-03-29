import { Request } from "express";
import { BookingStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const createEvent = async (data: {
  title: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  type: string;
  feeType: string;
  registrationFee: number;
  organizer: string;
  maxParticipants: number;
  category: string;
  status: string;
}) => {

  return await prisma.event.create({
    data: {
      title: data.title,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      venue: data.venue,
      description: data.description,
      type: data.type,
      feeType: data.feeType,
      registrationFee: data.registrationFee,
      organizer: data.organizer,
      maxParticipants: data.maxParticipants,
      category: data.category,
      status: data.status,
    },
  });
};

const getMyEvents = async (studentId: string) => {
  try {
    if (!studentId) {
      throw new Error("Student ID is required");
    }

    const events = await prisma.event.findMany({
      where: {
        organizer: studentId, // organizer field must exist in schema
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return events;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
};

const getEventsById = async (eventId: string) => {
    return await prisma.event.findUnique({
        where: {
            id: eventId,
        },
    });
};

const getAllEvents = async () => {
    return await prisma.event.findMany({
        select: {
            id: true,
            title: true,
            startDate: true,
            endDate: true,
            venue: true,
            description: true,
            type: true,
            feeType: true,
            registrationFee: true,
            organizer: true,
            maxParticipants: true,
            category: true,
            status: true,
        },
    });
};

const updateEvent = async (eventId: string, data: any) => {
  const updateData: any = {
    title: data.title,
    venue: data.venue,
    description: data.description,
    type: data.type,
    feeType: data.feeType,
    registrationFee: Number(data.registrationFee),
    organizer: data.organizer,
    maxParticipants: Number(data.maxParticipants),
    category: data.category,
    status: data.status,
  };

  if (data.startDate) {
    updateData.startDate = new Date(data.startDate);
  }

  if (data.endDate) {
    updateData.endDate = new Date(data.endDate);
  }

  return await prisma.event.update({
    where: { id: eventId },
    data: updateData,
  });
};


const deleteEvent = async (eventId: string, userId: string) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  // Check if event exists
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  // Check ownership
  if (event.organizer !== userId) {
    throw new Error("You are not allowed to delete this event");
  }

  // Delete event
  const deletedEvent = await prisma.event.delete({
    where: { id: eventId },
  });

  return deletedEvent;
};


export const eventService = {
    createEvent,
    getMyEvents,
    getEventsById,
    getAllEvents,
    updateEvent, 
    deleteEvent
}