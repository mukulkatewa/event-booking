import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createClub = async (req: Request, res: Response) => {
  try {
    const { name, description, logoUrl } = req.body;
    const adminId = req.user?.userId;

    const club = await prisma.club.create({
      data: {
        name,
        description,
        logoUrl,
        adminId: adminId!,
      },
    });

    res.status(201).json({ club });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create club' });
  }
};

export const getAllClubs = async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.club.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
    });

    res.json({ clubs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
};

export const getClubById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const club = await prisma.club.findUnique({
      where: { id },
      include: {
        events: {
          where: { status: 'ACTIVE' },
          orderBy: { date: 'asc' },
        },
      },
    });

    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    res.json({ club });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch club' });
  }
};