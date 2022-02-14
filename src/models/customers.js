const customersModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "customers",
    {
      customer_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      lastname: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
    },
    {
      tableName: "customers",
      timestamps: false,
    },
  );
};

export default customersModel;
