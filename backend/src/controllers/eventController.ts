import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const { category, search, date } = req.query;

    const where: any = { status: 'ACTIVE' };

    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (date) {
      where.date = { gte: new Date(date as string) };
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        club: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
      },
      orderBy: { date: 'asc' },
    });

    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        club: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            description: true,
          },
        },
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      posterUrl,
      venue,
      date,
      time,
      totalSeats,
      price,
      category,
      clubId,
    } = req.body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        posterUrl,
        venue,
        date: new Date(date),
        time,
        totalSeats: parseInt(totalSeats),
        availableSeats: parseInt(totalSeats),
        price: parseFloat(price),
        category,
        clubId,
      },
      include: {
        club: true,
      },
    });

    res.status(201).json({ event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      posterUrl,
      venue,
      date,
      time,
      totalSeats,
      price,
      category,
    } = req.body;

    // Build update data object, only including fields that are provided
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (posterUrl !== undefined) updateData.posterUrl = posterUrl;
    if (venue !== undefined) updateData.venue = venue;
    if (date !== undefined) updateData.date = new Date(date);
    if (time !== undefined) updateData.time = time;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = parseFloat(price);
    
    // Handle totalSeats - also update availableSeats proportionally
    if (totalSeats !== undefined) {
      const currentEvent = await prisma.event.findUnique({ where: { id } });
      if (currentEvent) {
        const bookedSeats = currentEvent.totalSeats - currentEvent.availableSeats;
        const newTotalSeats = parseInt(totalSeats);
        updateData.totalSeats = newTotalSeats;
        updateData.availableSeats = Math.max(0, newTotalSeats - bookedSeats);
      }
    }

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        club: true,
      },
    });

    res.json({ event });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({ where: { id } });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};