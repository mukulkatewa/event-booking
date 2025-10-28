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
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
    });

    res.json({ event });
  } catch (error) {
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