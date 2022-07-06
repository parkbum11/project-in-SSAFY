module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "article",

    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT(65535),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
};
