import { Router } from 'express';
import MenuItem from '../models/MenuItem';
import { AuthRequest, roleMiddleware } from '../middleware/auth';

const router = Router();

// Get all menu items
router.get('/', async (req: AuthRequest, res) => {
  try {
    const items = await MenuItem.findAll({
      where: { restaurantId: req.user?.restaurantId },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Create menu item
router.post('/', roleMiddleware(['admin', 'manager']), async (req: AuthRequest, res) => {
  try {
    const { name, description, category, price } = req.body;
    const item = await MenuItem.create({
      name,
      description,
      category,
      price,
      restaurantId: req.user?.restaurantId,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// Update menu item
router.put('/:id', roleMiddleware(['admin', 'manager']), async (req: AuthRequest, res) => {
  try {
    const item = await MenuItem.findByPk(req.params.id);
    if (!item || item.restaurantId !== req.user?.restaurantId) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Delete menu item
router.delete('/:id', roleMiddleware(['admin', 'manager']), async (req: AuthRequest, res) => {
  try {
    const item = await MenuItem.findByPk(req.params.id);
    if (!item || item.restaurantId !== req.user?.restaurantId) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

export default router;
