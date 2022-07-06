import axios from "axios";

export const SurveyGet = async () => {
  const res = await fetch("/api/survey_questions");
  const body = await res.json();
  return body;
};

export const newSurvey = (input) => {
  return axios
    .post("/api/survey_questions", {
      text: input,
      checked: false,
    })
    .then(() => {
      console.log("make survey_questions");
    });
};

export const delSurvey = (input_id) => {
  return axios
    .delete(`/api/survey_questions/${input_id}`, {
      id: input_id,
    })
    .then(() => {
      console.log("delete Survey_answer");
    });
};

export const patchSurvey = (input_id, value) => {
  return axios
    .patch(`/api/survey_questions/${input_id}`, {
      text: value,
      checked: false,
    })
    .then((res) => {
      console.log("Update");
    });
};
