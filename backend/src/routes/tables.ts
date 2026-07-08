import { Router } from 'express';
import Table from '../models/Table';
import { AuthRequest } from '../middleware/auth';

const router = Router();

// Get all tables
router.get('/', async (req: AuthRequest, res) => {
  try {
    const tables = await Table.findAll({
      where: { restaurantId: req.user?.restaurantId },
    });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

// Create table
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { tableNumber, capacity, section } = req.body;
    const table = await Table.create({
      tableNumber,
      capacity,
      section,
      restaurantId: req.user?.restaurantId,
    });
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create table' });
  }
});

// Update table status
router.patch('/:id/status', async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;
    const table = await Table.findByPk(req.params.id);
    if (!table || table.restaurantId !== req.user?.restaurantId) {
      return res.status(404).json({ error: 'Table not found' });
    }
    await table.update({ status });
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update table' });
  }
});

export default router;
