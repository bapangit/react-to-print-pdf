import React, { useEffect, useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import { AiTwotoneLock } from "react-icons/ai";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import BizClass from "./Login.module.scss";
import { authenticate } from "Service/ApiMethods/authenticate";
import { AlertMessage } from "Framework/Components/Widgets/Notification/NotificationProvider";
import { setSessionStorage } from "Service/AuthVerify/auth";

function Login() {
  const navigate = useNavigate();
  const setAlertMessage = AlertMessage();
  const [revealPassword, setRevealPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [validationFormError, setValidationFormError] = useState({});
  const [formValues, setFormValues] = useState({
    txtUsername: "",
    txtPassword: "",
  });

  const updateFormState = (name, value) => {
    if (!isLoading) {
      validationFormError[name] = validateField(name, value);
      setFormValues((values) => ({
        ...values,
        [name]: value,
      }));
    }
  };

  const handleValidation = () => {
    try {
      const errors = {};
      let formIsValid = true;
      errors["txtUsername"] = validateField("txtUsername", formValues.txtUsername);
      errors["txtPassword"] = validateField("txtPassword", formValues.txtPassword);
      if (Object.values(errors).join("").toString()) {
        formIsValid = false;
      }
      setValidationFormError(errors);
      return formIsValid;
    } catch (error) {
      setAlertMessage({
        open: true,
        type: "error",
        message: "Something went wrong!",
      });
      return false;
    }
  };

  const validateField = (name, value) => {
    let errorsMsg = "";
    if (name === "txtUsername") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Username Cannot be empty";
      }
    } else if (name === "txtPassword") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Password Cannot be empty";
      }
    }
    return errorsMsg;
  };

  const handleSave = async () => {
    if (!handleValidation()) {
      return;
    }
    try {
      setIsLoading(true);
      const formData = {
        Username: formValues.txtUsername,
        Password: formValues.txtPassword,
      };
      const result = await authenticate(formData);
      setIsLoading(false);
      if (result && result.ResponseCode === 1) {
        if (!result.ResponseData) {
          setAlertMessage({
            open: true,
            type: "error",
            message: result.ResponseMessage,
          });
          return;
        }
        let userData = {
          ...result.ResponseData,
          LoggedInUser: true,
        };
        setSessionStorage("userData", JSON.stringify(userData));
        navigate("/welcome");
      } else {
        setAlertMessage({
          open: true,
          type: "error",
          message: result.ResponseMessage,
        });
      }
    } catch (error) {
      console.log(error);
      setAlertMessage({
        open: true,
        type: "error",
        message: "Something went wrong!",
      });
    }
  };

  const togglePassword = () => {
    setRevealPassword(!revealPassword);
  };

  useEffect(() => {
    document.title = "Orion Accounting";
  }, []);

  return (
    <div className={BizClass.MainSection}>
      <div className={BizClass.BannerSection}>
        {/* <div>
          {/* <div className={BizClass.ClientText}>
            <h4>Orion Accounting</h4>
            <p />
          </div>
        </div> */}
      </div>
      <div className={BizClass.FormSection}>
        <div className={BizClass.SubFormSection}>
          <div className={BizClass.FormBox}>
            <div className={BizClass.ClientLogoBox} />
            {/* <img src={`${process.env.PUBLIC_URL}favicon.ico`} alt="Client Logo" /> */}
            <div className={BizClass.ClientNameBox} />
          </div>
          <div className={BizClass.InputBox}>
            <div className={BizClass.InputGroup}>
              <div className={BizClass.LabelBox}>
                <label>UserName</label>
              </div>
              <div className={classNames(BizClass.InputGroupBox, validationFormError["txtUsername"] ? BizClass.InputGroupBoxError : null)}>
                <div className={BizClass.SubInputGroup}>
                  <RiUser3Fill className={BizClass.BoxIcon} />
                  <input
                    type="text"
                    name="txtUsername"
                    value={formValues.txtUsername}
                    onChange={(e) => {
                      updateFormState(e.target.name, e.target.value);
                    }}
                  />
                </div>
                <span>{validationFormError["txtUsername"]}</span>
                <span />
              </div>
            </div>
            <div className={BizClass.InputGroup}>
              <div className={BizClass.LabelBox}>
                <label>Password</label>
                <p>Forgot your password ?</p>
              </div>
              <div className={classNames(BizClass.InputGroupBox, validationFormError["txtPassword"] ? BizClass.InputGroupBoxError : null)}>
                <div className={BizClass.SubInputGroup}>
                  <AiTwotoneLock className={BizClass.BoxIcon} />
                  <input
                    type={revealPassword ? "text" : "password"}
                    name="txtPassword"
                    value={formValues.txtPassword}
                    onChange={(e) => updateFormState(e.target.name, e.target.value)}
                  />
                  {revealPassword ? (
                    <VscEyeClosed className={BizClass.PassBoxIconClosed} onClick={() => togglePassword()} />
                  ) : (
                    <VscEye className={BizClass.PassBoxIcon} onClick={() => togglePassword()} />
                  )}
                </div>
                <span>{validationFormError["txtPassword"]}</span>
              </div>
            </div>
            <button type="button" className={classNames(BizClass.ButtonWithLoader, isLoading ? BizClass.loading : null)} onClick={() => handleSave()}>
              <span className={BizClass.ButtonText}>Login</span>
              <span className={BizClass.ButtonLoader} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
