import React, { useState, useEffect } from "react";
import { StudentItem } from "components";
import axios from "axios";

const StudentSearch = (name) => {
  const [studentsDatas, setStudentsDatas] = useState([]);
  useEffect(() => {
    axios.get(`/api/students/`).then((res) => {
      if (res.data.length !== 0) {
        setStudentsDatas(res.data[0].students);
      }
    });
  }, []);
};

export default StudentSearch;
