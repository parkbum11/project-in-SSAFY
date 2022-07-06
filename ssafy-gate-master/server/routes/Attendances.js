const express = require("express");
const attendances = express.Router();
const { Attendance, Sequelize } = require("../models");
const Op = Sequelize.Op;
const cors = require("cors");
attendances.use(cors());

attendances.get("/", (req, res) => {
  Attendance.findAll()
    .then((attendances) => {
      res.json(attendances);
    })
    .catch((err) => {
      console.error(err);
    });
});

attendances.get("/today", (req, res) => {
  Attendance.findAll({
    where: {
      createdAt: {
        [Op.gt]: new Date().setHours(0, 0, 0, 0),
      },
    },
  })
    .then((attendances) => {
      res.json(attendances);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = attendances;
