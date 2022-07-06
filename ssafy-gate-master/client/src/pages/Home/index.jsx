import React from "react";
import { Route, Switch } from "react-router-dom";

import { StudentManagement, Login, NoticePage, Survey_answer } from "pages";

import { Main } from "../../layout/index";

const Home = ({ handleToggleSidebar }) => {
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route
            path="/stdmgt/:region/:classno"
            component={StudentManagement}
          />
          <Route path="/login" component={Login} />
          <Route path="/notice" component={NoticePage} />
          <Route path="/survey" component={Survey_answer} />
        </Switch>
      </div>
    </main>
  );
};

export default Home;
