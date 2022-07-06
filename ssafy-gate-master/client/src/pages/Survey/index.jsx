import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import SurveyListTemplate from "../../components/Survey/SurveyListTemplate";
import Form from "../../components/Survey/Surveyform";
import SurveyItemList from "../../components/Survey/SurveyItemList";
import {
  SurveyGet,
  newSurvey,
  delSurvey,
  patchSurvey,
} from "modules/SurveyFunctions.js";

const Survey_answer = ({ history }) => {
  const token = localStorage.usertoken;

  useEffect(() => {
    if (token) {
    } else {
      alert("로그인해주세요!!");
      history.push("/");
    }
  }, []);

  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(0);
  const [survey_answers, setSurvey_answers] = useState([]);

  useEffect(() => {
    SurveyGet().then((res) => {
      setSurvey_answers(res);
    });
  }, [flag]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleCreate = () => {
    newSurvey(input).then(() => {
      setInput("");
      setFlag(flag + 1);
    });
  };

  const handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === "Enter") {
      handleCreate();
    }
  };
  const handleToggle = (id) => {
    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const check = survey_answers.findIndex(
      (survey_answer) => survey_answer.checked === true
    );
    if (check !== -1) {
      const checksurvey = survey_answers[check];
      survey_answers[check] = {
        ...checksurvey,
        checked: !checksurvey.checked,
      };
    }
    const index = survey_answers.findIndex(
      (survey_answer) => survey_answer.id === id
    );
    const selected = survey_answers[index]; // 선택한 객체

    const nextsurveys = [...survey_answers]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextsurveys[index] = {
      ...selected,
      checked: !selected.checked,
    };
    setSurvey_answers(nextsurveys);
  };
  // 지우기 버튼 누르면
  // 1. survey_answer state 값 변경
  const handleRemove = (id) => {
    setSurvey_answers(
      survey_answers.filter((survey_answer) => survey_answer.id !== id)
    );
    delSurvey(id).then(() => {
      setFlag(flag + 1);
    });
  };
  const handlePatch = (id, value) => {
    patchSurvey(id, value).then(() => {
      setFlag(flag + 1);
    });
  };
  return (
    <SurveyListTemplate
      form={
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      }
    >
      <SurveyItemList
        survey_answers={survey_answers}
        onToggle={handleToggle}
        onRemove={handleRemove}
        onPatch={handlePatch}
      />
    </SurveyListTemplate>
  );
};
export default Survey_answer;
