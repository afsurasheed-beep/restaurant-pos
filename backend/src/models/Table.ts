import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export enum TableStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
  MAINTENANCE = 'maintenance',
}

export class Table extends Model {
  public id!: string;
  public tableNumber!: number;
  public capacity!: number;
  public status!: TableStatus;
  public restaurantId!: string;
  public section?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Table.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tableNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TableStatus)),
      defaultValue: TableStatus.AVAILABLE,
    },
    restaurantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tables',
    timestamps: true,
  }
);

export default Table;
