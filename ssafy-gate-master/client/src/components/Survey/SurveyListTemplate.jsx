import React from "react";
import Wrapper from "./SurveyListTemplatestyles";

const SurveyListTemplate = ({ form, children }) => {
  return (
    <Wrapper>
      <main className="survey_answer-list-template">
        <div className="title">싸피 건강 설문</div>
        <section className="form-wrapper">{form}</section>
        <section className="survey_answers-wrapper">{children}</section>
      </main>
    </Wrapper>
  );
};

export default SurveyListTemplate;
