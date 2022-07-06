import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Badge from "@material-ui/core/Badge";

/* Badge Style */
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
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  big: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const StudentItem = ({
  studentData,
  studentRegion,
  surveysDatas,
  attendanceDatas,
  morning,
  time,
  timeafter,
  time2,
  timeafter2,
  conOrLate, // 건강상태인지 출결상태인지 // true: condition , false: late
  surveysQuestions,
}) => {
  /* 몸상태 List */

  const conditionList = [];
  const answerList = surveysDatas.filter(
    (survey_answer) => survey_answer.student_id === studentData.id
  );
  const dangerList = answerList.filter(
    (survey_answer) => survey_answer.answer !== 0 && survey_answer.d_b !== 0
  );
  const body_checkList = answerList.filter(
    (survey_answer) => survey_answer.answer !== 0 && survey_answer.d_b === 0
  );
  const hightemperatureList = attendanceDatas.filter(
    (survey_answer) => survey_answer.student_id === studentData.id
  );
  const temperature = hightemperatureList.map(
    (survey_answer) => survey_answer.body_temperature
  );
  if (dangerList.length !== 0) {
    conditionList.push("위험지역");
  }
  if (body_checkList.length !== 0) {
    conditionList.push("몸 상태 이상");
  }
  if (hightemperatureList.length !== 0) {
    if (temperature[0] >= 37.5) {
      conditionList.push("발열 증상");
    }
  }

  /* 출결상태 List */

  const attendStatusList = [];
  const attendanceList = attendanceDatas.filter(
    (survey) => survey.student_id === studentData.id
  );
  const attendTime = attendanceList.map((survey) => survey.createdAt);

  // 오늘 설문을 했다면
  const attendmorningDatas = attendanceDatas.filter((survey) =>
    moment(moment(survey.createdAt)).isBetween(time, timeafter)
  );
  const attendafternoonDatas = attendanceDatas.filter((survey) =>
    moment(moment(survey.createdAt)).isBetween(time2, timeafter2)
  );
  // attendance 등록한 시점이 9~18시
  const attendList = attendmorningDatas.filter(
    (survey) => survey.student_id === studentData.id
  );
  const attendList2 = attendafternoonDatas.filter(
    (survey) => survey.student_id === studentData.id
  );

  if (morning) {
    // 오전에
    if (attendanceList.length === 2) {
      if (attendList[0]) {
        // 정상입실 했다면
        attendStatusList.push("정상 입실");
        attendStatusList.push("조퇴");
      } else {
        attendStatusList.push("지각");
        attendStatusList.push("조퇴");
      }
    } else if (attendanceList.length === 1) {
      if (attendList[0]) {
        attendStatusList.push("정상 입실");
        attendStatusList.push("미퇴실");
      } else {
        attendStatusList.push("지각");
        attendStatusList.push("미퇴실");
      }
    } else {
      attendStatusList.push("미입실");
      attendStatusList.push("미퇴실");
    }
  } else {
    // 저녁에
    if (attendanceList.length === 2) {
      if (attendList[0]) {
        // 정상입실 했다면
        attendStatusList.push("정상 입실");
        if (attendList2[0]) {
          attendStatusList.push("정상 퇴실");
        } else {
          attendStatusList.push("조퇴");
        }
      } else {
        attendStatusList.push("지각");
        if (attendList2[0]) {
          attendStatusList.push("정상 퇴실");
        } else {
          attendStatusList.push("조퇴");
        }
      }
    } else if (attendanceList.length === 1) {
      if (attendList[0]) {
        attendStatusList.push("정상 입실");
        attendStatusList.push("미퇴실");
      } else {
        attendStatusList.push("지각");
        attendStatusList.push("미퇴실");
      }
    } else {
      attendStatusList.push("미입실");
      attendStatusList.push("미퇴실");
    }
  }
  // LatestudentList
  /* 발열증상(37.5도 이상)만 빨간색 그외 노란색 */

  /* Badge Color */

  var status_color = "";
  if (conOrLate === true) {
    // not undefined
    conditionList.includes("몸 상태 이상")
      ? (status_color = "red")
      : (status_color = "yellow");
  } else if (conOrLate === false) {
  } else {
    // 학생관리
  }

  /* Dialog */

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const classes = useStyles();

  let currentDateObj = new Date();

  let currentYear = currentDateObj.getFullYear(); // 년도
  let currentMonth = currentDateObj.getMonth() + 1; // 월
  let currentDate = currentDateObj.getDate(); // 날짜
  // let currentDay = currentDate.getDay(); // 요일

  /* 좌우 화면에 보여줄지 */
  var visible = true;

  if (conOrLate === true) {
    if (conditionList.length === 0) {
      visible = false;
    }
  } else if (conOrLate === false) {
    if (morning) {
      if (attendStatusList[0] === "정상 입실") {
        visible = false;
      } else if (attendStatusList[0] === "미입실") {
        status_color = "red";
      } else {
        status_color = "yellow";
      }
    } else {
      if (attendStatusList[1] === "정상 퇴실") {
        visible = false;
      } else if (attendStatusList[1] === "미퇴실") {
        status_color = "red";
        if (attendStatusList[0] == "미입실") {
          visible = false;
        }
      } else {
        status_color = "yellow";
      }
    }
  }
  return (
    <>
      {visible ? (
        <Button onClick={handleClickOpen("paper")}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            color={status_color}
            invisible={status_color ? false : true}
          >
            <Avatar
              alt="profile_image"
              src={studentData.profile_img}
              className={conOrLate === undefined ? classes.big : classes.large}
            />
          </StyledBadge>
        </Button>
      ) : (
        ""
      )}

      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <h2>
            {" "}
            {studentRegion} {studentData.class}반 {studentData.name}
          </h2>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h4>
                {currentYear}년 {currentMonth}월 {currentDate}일 설문결과
              </h4>
            </Grid>
            <Grid item xs={12} sm={2}>
              온도상태
            </Grid>
            <Grid item xs={12} sm={10}>
              {temperature ? temperature[0] : ""}
            </Grid>
            <hr></hr>
            <Grid item xs={12} sm={2}>
              출결상태
            </Grid>
            <Grid item xs={12} sm={2}>
              오전 :
            </Grid>
            <Grid item xs={12} sm={3}>
              {attendStatusList[0]}
            </Grid>
            <Grid item xs={12} sm={2}>
              오후 :
            </Grid>
            <Grid item xs={12} sm={3}>
              {attendStatusList[1]}
            </Grid>

            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Paper elevation="20">
                <Grid container spacing={2} justify="center" Background="Red">
                  {surveysQuestions.map((question, index) => (
                    <>
                      <Grid item xs={12} sm={9}>
                        {question.text}
                      </Grid>

                      <Grid item xs={12} sm={2}>
                        {index < answerList.length
                          ? answerList[index].answer === 1
                            ? "예"
                            : "아니오"
                          : ""}
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentItem;
