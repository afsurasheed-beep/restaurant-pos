import { Router } from 'express';
import Order from '../models/Order';
import { AuthRequest } from '../middleware/auth';

const router = Router();

// Get all orders for restaurant
router.get('/', async (req: AuthRequest, res) => {
  try {
    const orders = await Order.findAll({
      where: { restaurantId: req.user?.restaurantId },
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create order
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { tableId, items, notes } = req.body;
    const order = await Order.create({
      tableId,
      restaurantId: req.user?.restaurantId,
      userId: req.user?.id,
      notes,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
router.patch('/:id/status', async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order || order.restaurantId !== req.user?.restaurantId) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.update({ status });
    
    // Emit WebSocket event
    const io = req.app.locals.io;
    io.to(`table_${order.tableId}`).emit('order_updated', order);
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

export default router;
