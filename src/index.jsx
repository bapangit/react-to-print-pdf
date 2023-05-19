import React from "react";
import ReactDOM from "react-dom/client";
import "Framework/Assets/Styles/main.scss";
import { LicenseManager } from "ag-grid-enterprise";
import LicenseKeys from "Configuration/Utilities/LicenseManager/LicenseKeys.json";
import NotificationProvider from "Framework/Components/Widgets/Notification/NotificationProvider";
import App from "./App";

LicenseManager.setLicenseKey(LicenseKeys.AgGrid);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
);
