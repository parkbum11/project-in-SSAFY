import React from "react";
import SurveyItem from "./SurveyItem";

const SurveyItemList = ({ survey_answers, onToggle, onRemove, onPatch }) => {
  const surveyList = survey_answers.map(({ id, text, checked }) => (
    <SurveyItem
      id={id}
      text={text}
      checked={checked}
      onToggle={onToggle}
      onRemove={onRemove}
      onPatch={onPatch}
      key={id}
    />
  ));
  return <div>{surveyList}</div>;
};

export default SurveyItemList;
