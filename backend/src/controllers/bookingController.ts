import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { eventId, seatNumber } = req.body;
    const userId = req.user?.userId;

    // Check if event has available seats
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event || event.availableSeats <= 0) {
      return res.status(400).json({ error: 'No seats available' });
    }

    // Create booking and decrement available seats
    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId: userId!,
          eventId,
          seatNumber,
        },
        include: {
          event: {
            include: {
              club: true,
            },
          },
        },
      });

      await tx.event.update({
        where: { id: eventId },
        data: { availableSeats: { decrement: 1 } },
      });

      return newBooking;
    });

    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            club: true,
          },
        },
      },
      orderBy: { bookedAt: 'desc' },
    });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking || booking.userId !== userId) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await prisma.$transaction(async (tx) => {
      await tx.booking.update({
        where: { id },
        data: { bookingStatus: 'CANCELLED' },
      });

      await tx.event.update({
        where: { id: booking.eventId },
        data: { availableSeats: { increment: 1 } },
      });
    });

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};

export const getEventBookings = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const bookings = await prisma.booking.findMany({
      where: { eventId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};