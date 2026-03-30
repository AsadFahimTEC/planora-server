import { Request } from "express";
import { BookingStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

interface EventParticipation {
  userId: number;
  eventId: number;
  status: "joined" | "requested";
}

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

const getMyEvents = async (eventId: string) => {
    return await prisma.event.findMany({
        where: {
            id: eventId,
        },
    });
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
  return await prisma.event.update({
    where: { id: eventId },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      registrationFee: data.registrationFee
        ? Number(data.registrationFee)
        : undefined,
      maxParticipants: data.maxParticipants
        ? Number(data.maxParticipants)
        : undefined,
    },
  });
};

const deleteEvent = async (eventId: string, userId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) throw new Error("Event not found");

  // ✅ ONLY use this if organizerId exists
  // if (event.organizerId !== userId)
  //   throw new Error("Not authorized");

  return await prisma.event.delete({
    where: { id: eventId },
  });
};

// Temporary in-memory storage
export const eventParticipations: EventParticipation[] = [];

// Join a public event
 const joinEvent = async (eventId: number, userId: number) => {
  const exists = eventParticipations.find(
    (p) => p.eventId === eventId && p.userId === userId
  );
  if (exists) return null;

  const participation = { userId, eventId, status: "joined" as const };
  eventParticipations.push(participation);
  return participation;
};

// Request to join a private event
const requestEvent = async (eventId: number, userId: number) => {
  const exists = eventParticipations.find(
    (p) => p.eventId === eventId && p.userId === userId
  );
  if (exists) return null;

  const participation = { userId, eventId, status: "requested" as const };
  eventParticipations.push(participation);
  return participation;
};

export const eventService = {
    createEvent,
    getMyEvents,
    getEventsById,
    getAllEvents,
    updateEvent, 
    deleteEvent,
    joinEvent,
    requestEvent,
}