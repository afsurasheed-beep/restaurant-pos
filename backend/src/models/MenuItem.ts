import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export enum ItemCategory {
  APPETIZER = 'appetizer',
  MAIN = 'main',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
  SIDE = 'side',
}

export class MenuItem extends Model {
  public id!: string;
  public name!: string;
  public description?: string;
  public category!: ItemCategory;
  public price!: number;
  public restaurantId!: string;
  public isAvailable!: boolean;
  public preparationTime?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(ItemCategory)),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    preparationTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'menu_items',
    timestamps: true,
  }
);

export default MenuItem;
