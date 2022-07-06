import styled from "styled-components";

const Wrapper = styled.div`
  .survey_answer-item {
    padding: 1rem;
    display: flex;
    align-items: center; /* 세로 가운데 정렬 */
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
  }

  .survey_answer-item:hover {
    background: #e3fafc;
  }

  /* survey_answer-item 에 마우스가 있을때만 .remove 보이기 */
  .survey_answer-item:hover .remove {
    opacity: 1;
  }

  /* survey_answer-item 사이에 윗 테두리 */
  .survey_answer-item + .survey_answer-item {
    border-top: 1px solid #f1f3f5;
  }

  .remove {
    margin-right: 1rem;
    color: #e64980;
    font-weight: 800;
    opacity: 0;
    font-size: 1.5em;
  }

  .survey_answer-text {
    flex: 1; /* 체크, 엑스를 제외한 공간 다 채우기 */
    word-break: break-all;
  }

  .checked {
    text-decoration: line-through;
    color: #adb5bd;
  }

  .update-input-box {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    font-size: 1em;
    width: 90%;
    border: 1px solid #d8d8d8;
    border-radius: 8px;
  }
  .update-button {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    margin-left: 0.8rem;
    background: #22b8cf;
    border-radius: 3px;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .update-button:hover {
    background: #3bc9db;
  }

  .check-mark {
    font-size: 1.5rem;
    line-height: 1rem;
    margin-left: 1rem;
    color: #3bc9db;
    font-weight: 800;
  }
`;
export default Wrapper;
