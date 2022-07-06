const express = require("express");
const survey_questions = express.Router();
const { Pro, Survey_question } = require("../models");
const cors = require("cors");
survey_questions.use(cors());

survey_questions.get("/", (req, res) => {
  Survey_question.findAll()
    .then((survey_questions) => {
      res.json(survey_questions);
    })
    .catch((err) => {
      console.error(err);
    });
});

survey_questions.post("/", (req, res) => {
  Survey_question.create({
    text: req.body.text,
    checked: req.body.checked,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

survey_questions.get("/:id", (req, res) => {
  Survey_question.findAll({
    include: {
      model: Pro,
      where: { id: req.params.id },
    },
  })
    .then((survey_questions) => {
      res.json(survey_questions);
    })
    .catch((err) => {
      console.error(err);
    });
});

survey_questions.patch("/:id", (req, res) => {
  Survey_question.update(
    {
      text: req.body.text,
      checked: req.body.checked,
    },
    { where: { id: req.params.id } }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

survey_questions.delete("/:id", (req, res) => {
  Survey_question.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = survey_questions;
