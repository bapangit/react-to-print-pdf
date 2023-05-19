import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import BizClass from "./Header.module.scss";

function Header({ subMenuList, activeSubMenuId, onClickSubMenu, onClickSubSubMenu }) {
  return (
    <div className={BizClass.Box}>
      {subMenuList && subMenuList.length > 0 && (
        <div className={BizClass.Menu}>
          <ul>
            {subMenuList.map((data) => {
              return (
                <li key={data.id}>
                  <button type="button" className={activeSubMenuId === data.id ? BizClass.active : null} onClick={() => onClickSubMenu(data)}>
                    {data.name}
                    {data && data.submenu && data.submenu.length > 0 && <IoIosArrowDown />}
                  </button>
                  {data && data.submenu && data.submenu.length > 0 && (
                    <div className={BizClass.SubMenu}>
                      <ul>
                        {data.submenu.map((data1) => {
                          return (
                            <li>
                              <button type="button" onClick={() => onClickSubSubMenu(data1)}>
                                {data1.name}
                              </button>
                              {data1 && data1.submenu && data1.submenu.length > 0 && (
                                <div className={BizClass.SubMenu2}>
                                  <ul>
                                    {data1.submenu.map((data2) => {
                                      return (
                                        <li>
                                          <button type="button" onClick={() => onClickSubSubMenu(data2)}>
                                            {data2.name}
                                          </button>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
