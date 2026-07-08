import { Router } from 'express';
import { AuthRequest } from '../middleware/auth';
import Order from '../models/Order';
import { Op } from 'sequelize';

const router = Router();

// Get sales report
router.get('/sales', async (req: AuthRequest, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const orders = await Order.findAll({
      where: {
        restaurantId: req.user?.restaurantId,
        status: 'completed',
        createdAt: {
          [Op.gte]: startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          [Op.lte]: endDate ? new Date(endDate as string) : new Date(),
        },
      },
    });

    const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount.toString()), 0);
    const orderCount = orders.length;
    const averageOrderValue = orderCount > 0 ? totalSales / orderCount : 0;

    res.json({
      totalSales,
      orderCount,
      averageOrderValue,
      period: { startDate, endDate },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales report' });
  }
});

export default router;
