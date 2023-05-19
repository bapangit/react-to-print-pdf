import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "Components/Modules/Common/Sidebar/Sidebar";
import { checkAuthExist } from "Service/AuthVerify/auth";
import { useNavigate } from "react-router-dom";
import BizClass from "./Page.module.scss";

function Page(props) {
  const { title, component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title ? `${title} | Orion Accounting` : "Orion Accounting";
  }, [title]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkAuthExist()) {
        navigate("/");
      }
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={BizClass.Dash}>
        <Sidebar pagetitle={title} />
        <div className={BizClass.Box}>{component}</div>
      </div>
    </>
  );
}

export default Page;

Page.propTypes = {
  title: PropTypes.string,
  component: PropTypes.node.isRequired,
};
