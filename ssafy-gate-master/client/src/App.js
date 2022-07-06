import React, { useState } from "react";
import { SideNavigation, TopNavigation, Footer } from "./layout/index";
import Home from "./pages/Home/index";
import "./index.css";

function App({ setLocale }) {
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <>
      <div className="flexible-content">
        <TopNavigation />
        <SideNavigation />
      </div>
      <main id="content" className="p-5">
        <Home toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      </main>
      <Footer />
    </>
  );
}

export default App;

/* 
1. exact 대신 Switch 가능
2. about/:name이 about 보다 위에 있어야 한다.
*/
