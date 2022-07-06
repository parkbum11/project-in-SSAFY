import React from "react";
import Wrapper from "./Surveyformstyles";

const Form = ({ value, onChange, onCreate, onKeyPress }) => {
  return (
    <Wrapper>
      <div className="form">
        <input value={value} onChange={onChange} onKeyPress={onKeyPress} />
        <div className="create-button" onClick={onCreate}>
          추가
        </div>
      </div>
    </Wrapper>
  );
};

export default Form;
