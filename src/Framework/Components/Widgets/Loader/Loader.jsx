import React from "react";
import BizClass from "./Loader.module.scss";

function Loader() {
  return (
    <div className={BizClass.Loader_Back}>
      <div className={BizClass.Loader}>
        <img src={`${process.env.PUBLIC_URL}App_logo.svg`} alt="Page Loader" />
      </div>
    </div>
  );
}

export default Loader;
