import { Model, DataTypes, Sequelize } from "sequelize";

export default (connection: Sequelize) => {
  class Tracking extends Model {
    static associate(models: any) {
      Tracking.hasOne(models.order);
    }
  }

  Tracking.init(
    {
      orderStatus: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    { sequelize: connection, modelName: "tracking", tableName: "tracking", underscored: true, timestamps: true }
  );

  return Tracking;
};
