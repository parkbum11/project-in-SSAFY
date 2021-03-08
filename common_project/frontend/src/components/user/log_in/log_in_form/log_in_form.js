import React from 'react';
import styles from './log_in_form.module.css';

const LogInForm = ({logIn, logInInput, onChangeLogIn, setType}) => {
  // 로그인폼 구성하는 속성들 비구조화 할당
  const { email, password } = logInInput;

  const onEnter = (e) => {
    if(e.keyCode === 13) {
      onSubmitLogIn();
    }
  }

  // 로그인 할 조건이 맞는지 확인하는 함수
  const onSubmitLogIn = () => {
    if(validateEmail(email) && validatePW(password)){
      logIn();
    }
  }

  // 이메일 형식 맞는지 확인하는 함수
  const validateEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      return (true);
    }
    alert("이메일 형식을 맞춰주세요.")
    return (false);
  }

  // 비밀번호 입력했는지 확인하는 함수
  const validatePW = (password) => {
    if(password === ''){
      alert("비밀번호를 입력하세요.");
      return (false);
    }
    return (true);
  }

  const goToFindPW = () => setType('findPW');

  return (
      <>
        <input 
          className={styles.input}
          type="text" 
          name="email"
          value={email}
          onKeyUp={onEnter}
          onChange={onChangeLogIn}  
          placeholder="이메일"/><br/>
        <input 
          className={styles.input}
          type="password" 
          name="password"
          value={password}
          onKeyUp={onEnter}
          onChange={onChangeLogIn} 
          placeholder="비밀번호"/><br/>
        <button 
          className={styles.button_find_PW}
          onClick={goToFindPW}>비밀번호를 잊으셨나요?</button><br/>
        <button 
          className={styles.button_login}
          onClick={onSubmitLogIn}>로그인</button>
    </>
  );
};

export default LogInForm;