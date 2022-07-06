import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  Home,
  StudentManagement,
  Login,
  TabTest,
  NoticePage,
  Register,
  Survey_answer,
} from "pages";
const Main = ({ handleToggleSidebar }) => {
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/stdmgt/:region/:classno"
            component={StudentManagement}
          />
          <Route path="/tab" component={TabTest} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/notice" component={NoticePage} />
          <Route path="/survey" component={Survey_answer} />
        </Switch>
      </div>
    </main>
  );
};

export default Main;
