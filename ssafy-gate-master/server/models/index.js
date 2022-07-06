const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Pro = require("./Pro")(sequelize, Sequelize);
db.Region = require("./Region")(sequelize, Sequelize);
db.Article = require("./Article")(sequelize, Sequelize);
db.Student = require("./Student")(sequelize, Sequelize);
db.Survey_answer = require("./Survey_answer")(sequelize, Sequelize);
db.Survey_question = require("./Survey_question")(sequelize, Sequelize);
db.Attendance = require("./Attendance")(sequelize, Sequelize);

db.Region.hasMany(db.Pro, { foreignKey: "region_id", sourceKey: "id" });
db.Pro.belongsTo(db.Region, { foreignKey: "region_id", targetKey: "id" });

db.Pro.hasMany(db.Article, { foreignKey: "pro_id", sourceKey: "id" });
db.Article.belongsTo(db.Pro, { foreignKey: "pro_id", targetKey: "id" });

db.Region.hasMany(db.Student, { foreignKey: "region_id", sourceKey: "id" });
db.Student.belongsTo(db.Region, { foreignKey: "region_id", targetKey: "id" });

db.Student.hasMany(db.Attendance, {
  foreignKey: "student_id",
  sourceKey: "id",
});
db.Attendance.belongsTo(db.Student, {
  foreignKey: "student_id",
  targetKey: "id",
});

db.Student.hasMany(db.Survey_answer, {
  foreignKey: "student_id",
  sourceKey: "id",
});
db.Survey_answer.belongsTo(db.Student, {
  foreignKey: "student_id",
  targetKey: "id",
});

db.Survey_question.hasMany(db.Survey_answer, {
  foreignKey: "question_id",
  sourceKey: "id",
});
db.Survey_answer.belongsTo(db.Survey_question, {
  foreignKey: "question_id",
  targetKey: "id",
});

module.exports = db;
