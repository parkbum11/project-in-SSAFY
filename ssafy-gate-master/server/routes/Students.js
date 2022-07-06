const express = require("express");
const students = express.Router();
const {
  Student,
  Region,
  Survey_answer,
  Survey_question,
  Attendance,
  Sequelize,
} = require("../models");
const Op = Sequelize.Op;
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const cors = require("cors");
students.use(cors());

students.get("/", (req, res) => {
  Region.findAll()
    .then((regions) => {
      res.json(regions);
    })
    .catch((err) => {
      console.error(err);
    });
});

students.post("/", upload.single("profile_img"), (req, res) => {
  Student.create({
    name: req.body.name,
    class: req.body.class,
    profile_img: "http://localhost:5000/" + req.file.filename,
    region_id: req.body.region_id,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

students.get(`/:region/:class`, (req, res) => {
  Region.findAll({
    where: {
      name: decodeURIComponent(req.params.region),
    },
    include: {
      model: Student,
      as: "students",
      where: { class: req.params.class },
      include: [
        {
          model: Attendance,
        },
        {
          model: Survey_answer,
          include: {
            model: Survey_question,
          },
        },
      ],
    },
  })
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.error(err);
    });
});

students.get("/:id", (req, res) => {
  Student.findOne({
    where: { id: req.params.id },
    include: {
      model: Attendance,
      where: {
        createdAt: {
          [Op.gt]: new Date().setHours(0, 0, 0, 0),
        },
      },
    },
  })
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      console.error(err);
    });
});

// students.get("/:name", (req, res) => {
//   Student.findOne({
//     where: { name: req.params.name },
//   })
//     .then((student) => {
//       res.json(student);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });

module.exports = students;
