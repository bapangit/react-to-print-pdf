import axios from "../../Configuration/axios/axios";
import { Buffer } from "buffer";
import publicIp from "public-ip";
import { clearSession, getSessionStorage } from "Service/AuthVerify/auth";
import { ApiEndPoints } from "../ApiEndPoints/endpoints";
const pako = require("pako");

export const getCountryListData = async (requestData) => {
  debugger;
  try {
    const ip = await publicIp.v4();
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    const request = {
      ...requestData,
      Common: {
        InsertUserID: userData.User.ID,
        InsertIPAddress: ip,
        DateShort: "dd-MM-yyyy",
        DateLong: "",
      },
    };

    const response = await axios.post(ApiEndPoints.DeliveryChallan.GetCountryList, request, {
      headers: {
        token: userData.Token,
      },
    });
    if (response && response.status === 200) {
      const result = await response.data;
      return { ResponseCode: result.ResponseCode, ResponseData: result.ResponseData, ResponseMessage: result.ResponseMessage };
    }
    return { ResponseCode: 0, ResponseData: null, ResponseMessage: "" };
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      clearSession();
      return { ResponseCode: 401, ResponseData: null, ResponseMessage: "Session Timeout,Please Login." };
    }
    console.log(error);
    return {
      ResponseCode: 0,
      ResponseData: null,
      ResponseMessage: error && error.response && error.response.data && error.response.statusText ? error.response.statusText : "Something went wrong",
    };
  }
};

export const getStateListData = async (requestData) => {
  debugger;
  try {
    const ip = await publicIp.v4();
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    const request = {
      ...requestData,
      Common: {
        InsertUserID: userData.User.ID,
        InsertIPAddress: ip,
        DateShort: "dd-MM-yyyy",
        DateLong: "",
      },
    };

    const response = await axios.post(ApiEndPoints.DeliveryChallan.GetStateList, request, {
      headers: {
        token: userData.Token,
      },
    });
    if (response && response.status === 200) {
      const result = await response.data;
      return { ResponseCode: result.ResponseCode, ResponseData: result.ResponseData, ResponseMessage: result.ResponseMessage };
    }
    return { ResponseCode: 0, ResponseData: null, ResponseMessage: "" };
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      clearSession();
      return { ResponseCode: 401, ResponseData: null, ResponseMessage: "Session Timeout,Please Login." };
    }
    console.log(error);
    return {
      ResponseCode: 0,
      ResponseData: null,
      ResponseMessage: error && error.response && error.response.data && error.response.statusText ? error.response.statusText : "Something went wrong",
    };
  }
};
export const getCityListData = async (requestData) => {
  debugger;
  try {
    const ip = await publicIp.v4();
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    const request = {
      ...requestData,
      Common: {
        InsertUserID: userData.User.ID,
        InsertIPAddress: ip,
        DateShort: "dd-MM-yyyy",
        DateLong: "",
      },
    };

    const response = await axios.post(ApiEndPoints.DeliveryChallan.GetCityList, request, {
      headers: {
        token: userData.Token,
      },
    });
    if (response && response.status === 200) {
      const result = await response.data;
      return { ResponseCode: result.ResponseCode, ResponseData: result.ResponseData, ResponseMessage: result.ResponseMessage };
    }
    return { ResponseCode: 0, ResponseData: null, ResponseMessage: "" };
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      clearSession();
      return { ResponseCode: 401, ResponseData: null, ResponseMessage: "Session Timeout,Please Login." };
    }
    console.log(error);
    return {
      ResponseCode: 0,
      ResponseData: null,
      ResponseMessage: error && error.response && error.response.data && error.response.statusText ? error.response.statusText : "Something went wrong",
    };
  }
};
