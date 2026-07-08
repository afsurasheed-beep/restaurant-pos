# Restaurant POS - Backend API

Node.js/Express backend for the Restaurant POS system.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Menu
- `GET /api/menu` - List all menu items
- `POST /api/menu` - Create menu item (admin/manager)
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status

### Tables
- `GET /api/tables` - List all tables
- `POST /api/tables` - Create table
- `PATCH /api/tables/:id/status` - Update table status

### Reports
- `GET /api/reports/sales` - Sales report
