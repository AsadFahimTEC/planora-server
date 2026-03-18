import { Request } from "express";
import { BookingStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const createBooking = async (studentId: string, tutorId: string) => {
    return await prisma.booking.create({
        data: {
            studentId,
            tutorId,
            status: BookingStatus.UPCOMING
        },
    });
};

const getMyBookings = async (studentId: string) => {
    return await prisma.booking.findMany({
        where: { studentId },
        include: {
            tutor: {
                include: {
                    user: true
                },
            },
        },
        orderBy: {
            createdAt: "desc"
        },
    });
};

const getBookingById = async (bookingId: string, studentId: string) => {
    return await prisma.booking.findFirst({
        where: {
            id: bookingId,
            studentId,
        },
        include: {
            tutor: {
                include: {
                    user: true
                }
            },
            student: true,
        },
    });
};

const getAllTutors = async () => {
    return await prisma.tutorProfile.findMany({
        select: {
            userId: true,
            id: true,
            bio: true,
            pricePerHr: true,
            rating: true,
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        },

    });
};

const updateProfile = async (userId: string, data: any) => {
    // check tutor profile exists
    const existingProfile = await prisma.tutorProfile.findUnique({
        where: { userId },
    });

    if (!existingProfile) {
        // create if not exists
        return prisma.tutorProfile.create({
            data: {
                userId,
                bio: data.bio,
                pricePerHr: data.pricePerHr,
                categories: {
                    connect: data.categoryIds.map((id: string) => ({ id })),
                },
            },
            include: { categories: true },
        });
    }

    // update if exists
    return prisma.tutorProfile.update({
        where: { userId },
        data: {
            bio: data.bio,
            pricePerHr: data.pricePerHr,
            categories: {
                set: data.categoryIds.map((id: string) => ({ id })),
            },
        },
        include: { categories: true },
    });
};

const cancelBooking = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const bookingId = req.params.id;
    const studentId = req.user!.id; // comes from auth middleware

    // Call service to cancel booking
    const booking = await bookingService.cancelBooking(bookingId, studentId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or not owned by you",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (err: any) {
    console.error("Cancel booking error:", err.message || err);

    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};


export const bookingService = {
    createBooking,
    getMyBookings,
    getBookingById,
    getAllTutors,
    updateProfile,
    cancelBooking

}