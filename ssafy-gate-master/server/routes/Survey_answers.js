const express = require("express");
const survey_answers = express.Router();
const { Survey_answer, Sequelize } = require("../models");
const Op = Sequelize.Op;
const cors = require("cors");
survey_answers.use(cors());

survey_answers.get("/", (req, res) => {
  Survey_answer.findAll({
    include: {
      all: true,
    },
  })
    .then((survey_answers) => {
      res.json(survey_answers);
    })
    .catch((err) => {
      console.error(err);
    });
});

survey_answers.get("/today", (req, res) => {
  Survey_answer.findAll({
    where: {
      createdAt: {
        [Op.gt]: new Date().setHours(0, 0, 0, 0),
      },
    },
  })
    .then((survey_answers) => {
      res.json(survey_answers);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = survey_answers;
