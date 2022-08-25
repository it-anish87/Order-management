import { DataTypes, Model, Sequelize } from "sequelize";

export default (connection: Sequelize) => {
  class Order extends Model {
    static associate(models: any) {
      Order.hasMany(models.orderItem);
      Order.belongsTo(models.customer);
    }
  }
  Order.init(
    {
      itemTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      grandTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      }
    },
    { sequelize: connection, modelName: "order",tableName: "order", underscored: true, timestamps: true }
  );

  return Order;
};
