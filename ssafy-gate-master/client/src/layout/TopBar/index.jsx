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
  MDBBtn,
} from "mdbreact";
import "../styles.scss";
import { MenuItem, SubMenu, Menu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { IconButton, TextField } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";

function TopNavigation() {
  let history = useHistory();
  // const [input, setInput] = useState("");
  // const onChange = (e) => {
  //   setInput(e.target.value);
  // };
  const onClickRedirectPathHandler = (name) => (e) => {
    history.push(name);
  };
  const [collapse, setCollapse] = useState(false);

  const onClick = () => {
    setCollapse(!collapse);
  };
  const LoginRegLink = () => {
    return (
      <>
        <NavLink to="/login" activeClassName="activeClass">
          <MDBBtn color="stylish-color-dark" className="mbbtn">
            <MDBIcon icon="lock" className="mr-3" />
            Login
          </MDBBtn>
        </NavLink>
      </>
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
      <>
        {/* <div
          style={{
            marginTop: "5px",7\
            \
            '
            display: "flex",
          }}
        >
          <TextField
            margin="normal"
            value={input}
            placeholder="Search"
            onChange={onChange}
          ></TextField>
          <IconButton
            padding="normal"
            aria-label="delete"
            onClick={onClickRedirectPathHandler(`/StudentSearch/${input}`)}
          >
            <SearchIcon
              fontSize="default"
              color="inherit"
              htmlColor="#eeeeee"
            />
          </IconButton>
        </div> */}
        <NavLink
          to="/"
          activeClassName="activeClass"
          onClick={logOut.bind(this)}
        >
          <MDBBtn color="stylish-color-dark" className="mbbtn">
            <MDBIcon icon="lock" className="mr-3" />
            Logout
          </MDBBtn>
        </NavLink>
      </>
    );
  };

  return (
    <>
      <MDBNavbar className="flexible-navbar" light expand="xl" scrolling>
        <MDBNavbarToggler onClick={onClick} />
        <MDBNavbarNav right>
          {localStorage.usertoken ? <UserLink /> : <LoginRegLink />}
        </MDBNavbarNav>
      </MDBNavbar>
      <MDBCollapse isOpen={collapse} navbar>
        <MDBNavbar color="elegant-color" dark className="togglesidenav">
          <MDBNavbarNav>
            <MDBNavLink to="/">
              <strong>Home</strong>
            </MDBNavLink>
            <MDBNavLink to="/notice">
              <strong>공지사항</strong>
            </MDBNavLink>
            <MDBNavLink to="/survey">
              <strong>설문조사</strong>
            </MDBNavLink>
            <MDBNavItem style={{ color: "#fff", marginTop: "8px" }}>
              <SubMenu title={`학생관리`}>
                <SubMenu title={`서울`}>
                  <MenuItem>서울 1반</MenuItem>
                  <MenuItem>서울 2반</MenuItem>
                  <MenuItem>서울 3반</MenuItem>
                  <MenuItem>서울 4반</MenuItem>
                  <MenuItem>서울 5반</MenuItem>
                  <MenuItem>서울 6반</MenuItem>
                </SubMenu>
                <SubMenu title={`대전`}>
                  <MenuItem
                    onClick={onClickRedirectPathHandler("/stdmgt/대전/1")}
                  >
                    대전 1반
                  </MenuItem>
                  <MenuItem
                    onClick={onClickRedirectPathHandler("/stdmgt/대전/2")}
                  >
                    대전 2반
                  </MenuItem>
                  <MenuItem
                    onClick={onClickRedirectPathHandler("/stdmgt/대전/3")}
                  >
                    대전 3반
                  </MenuItem>
                </SubMenu>
                <SubMenu title={`광주`}>
                  <MenuItem>광주 1반</MenuItem>
                  <MenuItem>광주 2반</MenuItem>
                </SubMenu>
                <SubMenu title={`구미`}>
                  <MenuItem>구미 1반</MenuItem>
                  <MenuItem>구미 2반</MenuItem>
                </SubMenu>
              </SubMenu>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
      </MDBCollapse>
    </>
  );
}

export default TopNavigation;
