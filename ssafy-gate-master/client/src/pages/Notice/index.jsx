import React, { useEffect } from "react";
import { Notice } from "components";

import jwt_decode from "jwt-decode";

//style

import Paper from "@material-ui/core/Paper";

import Wrapper from "./styles";
import { Container } from "@material-ui/core";

const NoticePage = ({ history }) => {
  const token = localStorage.usertoken;

  if (token) {
    const decoded = jwt_decode(token);
    var id = decoded.id;
  }

  useEffect(() => {
    if (token) {
    } else {
      alert("로그인해주세요!!");
      history.push("/");
    }
  }, [token, history]);

  return (
    <Wrapper>
      <Container fixed>
        <Paper variant="outlined">
          <Notice id={id} />
        </Paper>
      </Container>
    </Wrapper>
  );
};

export default NoticePage;
