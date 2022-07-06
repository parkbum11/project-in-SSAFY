import React, { useState } from "react";
import Main from "./Main/index";
import "./styles.scss";

function Layout({ setLocale }) {
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return <div className={`app ${toggled ? "toggled" : ""}`}></div>;
}

export default Layout;
