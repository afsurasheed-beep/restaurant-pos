# Restaurant POS System

A complete, production-ready web-based Point of Sale system for restaurants. Built with React, Node.js, and PostgreSQL.

## Features

- **Order Management**: Create, track, and manage orders in real-time
- **Table Management**: Manage tables, reservations, and seating
- **Menu Management**: Create and manage menu items with categories
- **Inventory Tracking**: Track stock levels and receive alerts
- **Payment Processing**: Multiple payment methods support
- **Staff Management**: User roles, permissions, and activity tracking
- **Reporting & Analytics**: Sales reports, inventory reports, staff performance
- **Real-time Updates**: WebSocket-based live order updates
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

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
- Stripe (payment processing)

## Project Structure

```
restaurant-pos/
├── frontend/              # React application
├── backend/               # Node.js/Express API
├── docker-compose.yml     # Docker orchestration
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Docker & Docker Compose (recommended)
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### With Docker (Recommended)

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

### Manual Setup

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials

# Run database migrations
npm run migrate

# Seed initial data
npm run seed

# Start development server
npm run dev
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Default Credentials

- **Admin User**
  - Email: `admin@restaurant.local`
  - Password: `Admin@123456`

- **Manager User**
  - Email: `manager@restaurant.local`
  - Password: `Manager@123456`

- **Staff User**
  - Email: `staff@restaurant.local`
  - Password: `Staff@123456`

## API Documentation

API documentation is available at: `http://localhost:5000/api/docs`

## Database Schema

Key tables:
- `users` - User accounts and roles
- `restaurants` - Restaurant configuration
- `menu_items` - Menu items and categories
- `orders` - Customer orders
- `order_items` - Line items in orders
- `tables` - Restaurant tables
- `inventory` - Stock tracking
- `payments` - Payment records
- `staff_shifts` - Staff schedules

## Configuration

See `.env.example` for all available configuration options:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_pos
DB_USER=postgres
DB_PASSWORD=postgres

# API Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Frontend
VITE_API_URL=http://localhost:5000

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Running Tests

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## Development

```bash
# Format code
npm run lint

# Build for production
npm run build
```

## Deployment

See `DEPLOYMENT.md` for production deployment instructions.

## Contributing

See `CONTRIBUTING.md` for guidelines.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
