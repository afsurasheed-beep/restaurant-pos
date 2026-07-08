# Restaurant POS System

A complete, production-ready web-based Point of Sale system for restaurants. Built with React, Node.js, and PostgreSQL.

## 🚀 Features

- **Order Management**: Create, track, and manage orders in real-time
- **Table Management**: Manage tables, reservations, and seating
- **Menu Management**: Create and manage menu items with categories
- **Inventory Tracking**: Track stock levels and receive alerts
- **Payment Processing**: Multiple payment methods support
- **Staff Management**: User roles, permissions, and activity tracking
- **Reporting & Analytics**: Sales reports, inventory reports, staff performance
- **Real-time Updates**: WebSocket-based live order updates
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📊 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Redux Toolkit (state management)
- TailwindCSS (styling)
- Socket.io-client (real-time updates)

**Backend:**
- Node.js + Express
- PostgreSQL (database)
- Sequelize (ORM)
- Socket.io (WebSockets)
- JWT (authentication)

## 🏗️ Quick Start with Docker

```bash
# Clone repository
git clone https://github.com/afsurasheed-beep/restaurant-pos.git
cd restaurant-pos

# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

## 👤 Default Login Credentials

- **Admin**: `admin@restaurant.local` / `Admin@123456`
- **Manager**: `manager@restaurant.local` / `Manager@123456`
- **Staff**: `staff@restaurant.local` / `Staff@123456`

## 📚 Documentation

- [Backend Setup](./backend/README.md)
- [Frontend Setup](./frontend/README.md)
- [API Documentation](./backend/API.md)
- [Database Schema](./backend/DATABASE.md)
