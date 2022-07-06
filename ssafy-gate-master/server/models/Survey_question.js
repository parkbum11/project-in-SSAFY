module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "survey_question",

    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      text: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      checked: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      d_b: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
};
