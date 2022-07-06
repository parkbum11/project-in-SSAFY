import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBIcon,
  MDBListGroupItem,
  MDBNavLink,
} from "mdbreact";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function TopNavigation() {
  let history = useHistory();
  const [collapse, setCollapse] = useState(false);

  const onClick = () => {
    setCollapse(!collapse);
  };
  const LoginRegLink = () => {
    return (
      <NavLink to="/login" activeClassName="activeClass">
        <MDBListGroupItem>
          <MDBIcon icon="lock" className="mr-3" />
          Login
        </MDBListGroupItem>
      </NavLink>
    );
  };
  const UserLink = () => {
    const logOut = (e) => {
      e.preventDefault();
      localStorage.removeItem("usertoken");
      history.push(`/`);
      window.location.reload();
    };
    return (
      <NavLink to="/" activeClassName="activeClass" onClick={logOut.bind(this)}>
        <MDBListGroupItem>
          <MDBIcon icon="lock" className="mr-3" />
          Logout
        </MDBListGroupItem>
      </NavLink>
    );
  };

  return (
    <>
      <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
        <MDBNavbarToggler onClick={onClick} />
        <MDBNavbarNav right>
          {localStorage.usertoken ? <UserLink /> : <LoginRegLink />}
        </MDBNavbarNav>
      </MDBNavbar>
      <MDBCollapse isOpen={collapse} navbar>
        <MDBNavbar
          slim
          fixed
          breakWidth={1300}
          color="elegant-color"
          dark
          expand="md"
          className="z-depth-2 mb-4 p-2"
        >
          <MDBNavbarNav>
            <MDBNavItem>
              <MDBNavLink to="/">
                <strong>Home</strong>
              </MDBNavLink>
              <MDBNavLink to="/notice">
                <strong>공지사항</strong>
              </MDBNavLink>
              <MDBNavLink to="/survey">
                <strong>설문조사</strong>
              </MDBNavLink>
              <MDBNavLink to="/stdmgt">
                <strong>학생관리</strong>
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
      </MDBCollapse>
    </>
  );
}

export default TopNavigation;
