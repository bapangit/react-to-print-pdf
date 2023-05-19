import React from "react";
import BizClass from "./Footer.module.scss";

function Footer(props) {
  const { title, children, ...rest } = props;

  return (
    <footer className={BizClass.Div} {...rest}>
      {children}
    </footer>
  );
}

export default Footer;
