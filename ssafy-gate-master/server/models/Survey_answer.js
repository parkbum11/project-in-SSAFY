module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "survey_answer",

    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      answer: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      d_b: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
};
