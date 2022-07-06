const express = require("express");
const articles = express.Router();
const { Pro, Article } = require("../models");
const cors = require("cors");
articles.use(cors());

articles.get("/", (req, res) => {
  Article.findAll({ order: [["createdAt", "DESC"]] })
    .then((articles) => {
      res.json(articles);
    })
    .catch((err) => {
      console.error(err);
    });
});

articles.post("/", (req, res) => {
  Article.create({
    title: req.body.title,
    content: req.body.content,
    pro_id: req.body.pro_id,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

//수정
articles.get("/:id", (req, res) => {
  Article.findAll({
    where: { pro_id: req.params.id },
  })
    .then((articles) => {
      res.json(articles);
    })
    .catch((err) => {
      console.error(err);
    });
});
/*
articles.get("/:id", (req, res) => {
  Pro.findOne({
    where: { id: req.params.id },
    include: {
      model: Article,
    },
  })
    .then((articles) => {
      res.json(articles);
    })
    .catch((err) => {
      console.error(err);
    });
});
*/
articles.patch("/:id", (req, res) => {
  Article.update(
    {
      title: req.body.title,
      content: req.body.content,
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

articles.delete("/:id", (req, res) => {
  Article.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = articles;
