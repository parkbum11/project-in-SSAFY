const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public/")));

const User = require("./routes/User");
const Article = require("./routes/Articles");
const Student = require("./routes/Students");
const Survey_question = require("./routes/Survey_questions");
const Survey_answer = require("./routes/Survey_answers");
const Attendance = require("./routes/Attendances");

app.use("/api/users", User);
app.use("/api/articles", Article);
app.use("/api/students", Student);
app.use("/api/survey_questions", Survey_question);
app.use("/api/survey_answers", Survey_answer);
app.use("/api/attendances", Attendance);

app.listen(port, () => console.log(`Listening on port ${port}`));
