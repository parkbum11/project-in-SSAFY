import styled from "styled-components";

const Wrapper = styled.div`
  .survey_answer-list-template {
    background: white;
    width: 95%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
    margin: 0 auto; /* 페이지 중앙 정렬 */
    border-radius: 8px;
  }

  .title {
    padding: 1rem;
    font-size: 2.5rem;
    text-align: center;
    font-weight: 100;
    background: #4b515d;
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .form-wrapper {
    padding: 1rem;
    border-bottom: 1px solid #4b515d;
  }

  .survey_answers-wrapper {
    min-height: 5rem;
  }
`;
export default Wrapper;
