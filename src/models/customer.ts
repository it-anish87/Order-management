import { Model, DataTypes, Sequelize } from "sequelize";

export default (connection: Sequelize) => {
  class Customer extends Model {
    static associate(models: any) {
      Customer.hasMany(models.order);
    }
  }

  Customer.init(
    {
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Not a valid email address",
          },
        },
      }
    },
    { sequelize: connection, modelName: "customer", tableName: "customer", underscored: true, timestamps: true }
  );

  return Customer;
};
