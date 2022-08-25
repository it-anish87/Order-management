import { DataTypes, Model, Sequelize } from "sequelize";

export default (connection: Sequelize) => {
  class Product extends Model {
    static associate(models: any) {
      Product.hasOne(models.orderItem);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
      code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      }
    },
    { sequelize: connection, modelName: "product",tableName: "product", underscored: true, timestamps: true }
  );

  return Product;
};

