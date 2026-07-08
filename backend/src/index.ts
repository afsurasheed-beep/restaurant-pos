import express, { Express, Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import menuRoutes from './routes/menu';
import orderRoutes from './routes/orders';
import tableRoutes from './routes/tables';
import paymentRoutes from './routes/payments';
import reportRoutes from './routes/reports';
import { authMiddleware } from './middleware/auth';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.VITE_API_URL || 'http://localhost:3000',
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', authMiddleware, menuRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/tables', authMiddleware, tableRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/reports', authMiddleware, reportRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// WebSocket connections
io.on('connection', (socket: Socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_table', (data) => {
    socket.join(`table_${data.tableId}`);
  });

  socket.on('leave_table', (data) => {
    socket.leave(`table_${data.tableId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Store io instance for use in routes
app.locals.io = io;

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize database and start server
sequelize.sync({ alter: process.env.NODE_ENV === 'development' }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});

export { app, io };
