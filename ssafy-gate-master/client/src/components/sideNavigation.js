import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaTachometerAlt, FaGem, FaRegLaughWink } from "react-icons/fa";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SideNavigation = ({ toggled, handleToggleSidebar }) => {
  let history = useHistory();
  const onClickRedirectPathHandler = (name) => (e) => {
    history.push(name);
  };
  return (
    <ProSidebar
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
      className="sidebar-fixed position-fixed"
    >
      <SidebarHeader>
        <div
          style={{
            padding: "0 24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 20,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onClick={onClickRedirectPathHandler("/")}
        >
          SSAFYgate
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">new</span>}
            onClick={onClickRedirectPathHandler("/notice")}
          >
            공지사항
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            onClick={onClickRedirectPathHandler("/survey")}
          >
            {" "}
            설문조사
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu title={`학생관리`} icon={<FaRegLaughWink />}>
            <SubMenu title={`서울`}>
              <MenuItem>서울 1반</MenuItem>
              <MenuItem>서울 2반</MenuItem>
            </SubMenu>
            <SubMenu title={`대전`}>
              <MenuItem>대전 1반</MenuItem>
              <MenuItem onClick={onClickRedirectPathHandler("/stdmgt/대전/2")}>
                대전 2반
              </MenuItem>
              <MenuItem onClick={onClickRedirectPathHandler("/stdmgt/대전/3")}>
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
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default SideNavigation;
