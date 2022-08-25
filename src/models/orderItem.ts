import { DataTypes, Model, Sequelize } from "sequelize";

export default (connection: Sequelize) => {
  class OrderItem extends Model {
    static associate(models: any) {
      OrderItem.belongsTo(models.product);
      OrderItem.belongsTo(models.order);
    }
  }
  OrderItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    { sequelize: connection, modelName: "orderItem",tableName: "orderItem", underscored: true, timestamps: true }
  );

  return OrderItem;
};

