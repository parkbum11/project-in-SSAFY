import React, { useState } from "react";
import Wrapper from "./SurveyItemstyles";

const SurveyItem = ({ text, checked, id, onToggle, onRemove, onPatch }) => {
  const [input, setInput] = useState(text);
  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <Wrapper>
      <div className="survey_answer-item" onClick={() => onToggle(id)}>
        <div
          className="remove"
          onClick={(e) => {
            e.stopPropagation(); // onToggle 이 실행되지 않도록 함
            // e.preventDefault();
            onRemove(id);
          }}
        >
          &times;
        </div>
        <div className={`survey_answer-text ${checked && "checked"}`}>
          {checked ? (
            <input
              className="update-input-box"
              value={input}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={onChange}
            ></input>
          ) : (
            <div>{text}</div>
          )}
        </div>
        {checked ? (
          <div
            className="update-button"
            onClick={(e) => {
              e.stopPropagation();
              onPatch(id, input);
            }}
          >
            수정
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Wrapper>
  );
};

export default SurveyItem;
