import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  SERVED = 'served',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class Order extends Model {
  public id!: string;
  public tableId!: string;
  public orderNumber!: number;
  public status!: OrderStatus;
  public restaurantId!: string;
  public userId!: string;
  public totalAmount!: number;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tableId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      defaultValue: OrderStatus.PENDING,
    },
    restaurantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  }
);

export default Order;
