module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "attendance",

    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      body_temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
};
