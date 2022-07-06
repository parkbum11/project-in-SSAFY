import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import { StudentItem } from "components";
import moment from "moment";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Wrapper from "./styles";
import Badge from "@material-ui/core/Badge";

const StudentManagement = ({ history }) => {
  const token = localStorage.usertoken;

  useEffect(() => {
    if (token) {
    } else {
      alert("로그인해주세요!!");
      history.push("/");
    }
  }, []);

  const { region, classno } = useParams();
  const [studentsDatas, setStudentsDatas] = useState([]);
  const [surveysDatas, setSurveysDatas] = useState([]);
  const [attendanceDatas, setAttendanceDatas] = useState([]);
  const [surveysQuestions, setSurveysQuestions] = useState([]);

  const today = moment().format("YYYY-MM-DD HH:mm");
  const todaymorning = moment().format("YYYY-MM-DD 08:30");
  const todaymorningafter = moment(todaymorning).add(30, "m");
  const todayafternoon = moment().format("YYYY-MM-DD 18:00");
  const todayafternoonafter = moment(todayafternoon).add(30, "m");

  const StyledBadge = withStyles((theme) => ({
    badge: {
      invisible: (props) => (props.color === "" ? true : false),
      background: (props) =>
        props.color === "red"
          ? "linear-gradient(45deg, #f44336 30%, #FF8E53 90%)"
          : //? "#f44336"
          props.color === "yellow"
          ? "linear-gradient(45deg, #FFBF00 30%, #FF8E53 90%)"
          : "",

      width: theme.spacing(2),
      height: theme.spacing(2),
      marginRight: "10px",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }))(Badge);

  useEffect(() => {
    axios
      .get(`/api/students/${encodeURIComponent(region)}/${classno}`)
      .then((res) => {
        if (res.data.length !== 0) {
          setStudentsDatas(res.data[0].students);
        }
      });
  }, [region, classno]);
  useEffect(() => {
    async function fetchData() {
      await axios.get(`/api/survey_answers/today`).then((res) => {
        setSurveysDatas(res.data);
      });
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      await axios.get(`/api/attendances/today`).then((res) => {
        setAttendanceDatas(res.data);
      });
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      await axios.get(`/api/survey_questions`).then((res) => {
        setSurveysQuestions(res.data);
      });
    }
    fetchData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      height: "auto",
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Wrapper>
        <Grid container spacing={3}>
          <Grid className="grid" item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h1>건강 상태</h1>
              <hr />
              <div style={{ textAlign: "right", marginBottom: "15px" }}>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                  color="yellow"
                ></StyledBadge>
                위험지역 방문 &nbsp; &nbsp; &nbsp;
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                  color="red"
                ></StyledBadge>{" "}
                건강상태 나쁨
              </div>
              {moment(today).isBefore(todayafternoon)
                ? studentsDatas.map((studentData, index) => (
                    <StudentItem
                      studentData={studentData}
                      studentRegion={region}
                      surveysDatas={surveysDatas}
                      attendanceDatas={attendanceDatas}
                      time={todaymorning}
                      timeafter={todaymorningafter}
                      time2={todayafternoon}
                      timeafter2={todayafternoonafter}
                      morning={true}
                      key={index}
                      conOrLate={true}
                      surveysQuestions={surveysQuestions}
                    />
                  ))
                : studentsDatas.map((studentData, index) => (
                    <StudentItem
                      studentData={studentData}
                      studentRegion={region}
                      surveysDatas={surveysDatas}
                      attendanceDatas={attendanceDatas}
                      time={todaymorning}
                      timeafter={todaymorningafter}
                      time2={todayafternoon}
                      timeafter2={todayafternoonafter}
                      morning={false}
                      key={index}
                      conOrLate={true}
                      surveysQuestions={surveysQuestions}
                    />
                  ))}
            </Paper>
          </Grid>
          <Grid className="grid" item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h1> 출결 상태 </h1>
              <hr />
              <div style={{ textAlign: "right", marginBottom: "15px" }}>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                  color="yellow"
                ></StyledBadge>
                지각/조퇴 &nbsp; &nbsp; &nbsp;
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                  color="red"
                ></StyledBadge>{" "}
                미입실/미퇴실
              </div>

              {moment(today).isBefore(todayafternoon)
                ? studentsDatas.map((studentData, index) => (
                    <StudentItem
                      studentData={studentData}
                      studentRegion={region}
                      surveysDatas={surveysDatas}
                      attendanceDatas={attendanceDatas}
                      time={todaymorning}
                      timeafter={todaymorningafter}
                      time2={todayafternoon}
                      timeafter2={todayafternoonafter}
                      morning={true}
                      key={index}
                      conOrLate={false}
                      surveysQuestions={surveysQuestions}
                    />
                  ))
                : studentsDatas.map((studentData, index) => (
                    <StudentItem
                      studentData={studentData}
                      studentRegion={region}
                      surveysDatas={surveysDatas}
                      attendanceDatas={attendanceDatas}
                      time={todaymorning}
                      timeafter={todaymorningafter}
                      time2={todayafternoon}
                      timeafter2={todayafternoonafter}
                      morning={false}
                      key={index}
                      conOrLate={false}
                      surveysQuestions={surveysQuestions}
                    />
                  ))}
            </Paper>
          </Grid>
          <Grid className="grid" item xs={12}>
            <Paper className={classes.paper}>
              <h1> 학생 관리 </h1>
              <hr />
              <Grid container>
                {moment(today).isBefore(todayafternoon)
                  ? studentsDatas.map((studentData, index) => (
                      <Grid item xs={6} sm={3} md={2}>
                        <StudentItem
                          key={index}
                          studentData={studentData}
                          studentRegion={region}
                          surveysDatas={surveysDatas}
                          attendanceDatas={attendanceDatas}
                          time={todaymorning}
                          timeafter={todaymorningafter}
                          time2={todayafternoon}
                          timeafter2={todayafternoonafter}
                          morning={true}
                          surveysQuestions={surveysQuestions}
                        />
                        <h5>{studentData.name}</h5>
                      </Grid>
                    ))
                  : studentsDatas.map((studentData, index) => (
                      <Grid item xs={6} sm={3} md={2}>
                        <StudentItem
                          key={index}
                          studentData={studentData}
                          studentRegion={region}
                          surveysDatas={surveysDatas}
                          attendanceDatas={attendanceDatas}
                          time={todaymorning}
                          timeafter={todaymorningafter}
                          time2={todayafternoon}
                          timeafter2={todayafternoonafter}
                          morning={false}
                          surveysQuestions={surveysQuestions}
                        />
                        <h5>{studentData.name}</h5>
                      </Grid>
                    ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default StudentManagement;
