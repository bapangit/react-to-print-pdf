import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { RiFileUnknowFill } from "react-icons/ri";
import { TbClipboardList } from "react-icons/tb";
import { FaMoneyBill } from "react-icons/fa";
import BizClass from "./Sidebar.module.scss";
import MenuList from "./Data/MenuList";
import { AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { clearSession } from "Service/AuthVerify/auth";
import Header from "../Header/Header";

function Sidebar({ pagetitle }) {
  const navigate = useNavigate();
  const [subMenuList, setSubMenuList] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(0);
  const [activeSubMenuId, setActiveSubMenuId] = useState(0);

  const toggleMenu = (menu) => {
    //debugger;
    setActiveMenuId(menu.id);
    setActiveSubMenuId(0);
    if (menu.submenu && menu.submenu.length > 0) {
      setSubMenuList(menu.submenu);
    } else {
      setSubMenuList([]);
      navigate(menu.url && menu.url);
      setActiveSubMenuId(0);
    }
  };

  const onClickSubMenu = (submenu) => {
    //debugger;
    setActiveSubMenuId(submenu.id);
    navigate(submenu.url);
  };

  const onClickSubSubMenu = (submenu) => {
    //debugger;
    setActiveSubMenuId(submenu.id);
    navigate(submenu.url);
  };

  const onLogOutClick = () => {
    clearSession();
    navigate("/");
  };

  const onHomeMenuClick = () => {
    navigate("/welcome");
    setActiveMenuId(0);
    setActiveSubMenuId(0);
    setSubMenuList([]);
  };

  const menuIconWithSwitch = (parameter) => {
    switch (parameter.toLowerCase()) {
      case "master":
        return <AiFillSetting />;
      case "transaction":
        return <FaMoneyBill />;
      case "compliance":
        return <TbClipboardList />;
      case "mis":
        return <GoGraph />;
      default:
        return <RiFileUnknowFill />;
    }
  };

  const props = {
    pagetitle,
    subMenuList,
    activeSubMenuId,
    onClickSubMenu,
    onClickSubSubMenu,
  };

  // useEffect(() => {
  //   console.log(activeSubMenuId, "Sub Menu ID");
  // }, [activeSubMenuId]);

  return (
    <>
      <Header {...props} />
      <div className={BizClass.Box}>
        <div className={BizClass.Box}>
          <div className={BizClass.ClientLogo}>
            <button type="button" onClick={() => onHomeMenuClick()} />
          </div>
          <ul>
            {MenuList &&
              MenuList.map((data) => {
                return (
                  <li key={data.id}>
                    <button type="button" className={activeMenuId === data.id ? BizClass.Active : null} onClick={() => toggleMenu(data)}>
                      {menuIconWithSwitch(data.name)}
                      <span>{data.name}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        <button type="button" className={BizClass.LogoutBox} onClick={() => onLogOutClick()}>
          <FiLogOut />
        </button>
      </div>
    </>
  );
}

export default Sidebar;
