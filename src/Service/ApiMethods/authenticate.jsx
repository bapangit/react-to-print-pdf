import axios from "../../Configuration/axios/axios";
import { Buffer } from "buffer";
import publicIp from "public-ip";
import { checkAuthExist, getSessionStorage } from "Service/AuthVerify/auth";
import { ApiEndPoints } from "../ApiEndPoints/endpoints";
const pako = require("pako");

export const authenticate = async (requestData) => {
  try {
    const response = await axios.post(ApiEndPoints.Authenticate, requestData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response && response.status === 200) {
      const result = await response.data;
      return { ResponseCode: result.ResponseCode, ResponseData: result.ResponseData, ResponseMessage: result.ResponseMessage };
    }
    return { ResponseCode: 0, ResponseData: null, ResponseMessage: "" };
  } catch (error) {
    console.log(error);
    return {
      ResponseCode: 0,
      ResponseData: null,
      ResponseMessage: error && error.response && error.response.data && error.response.statusText ? error.response.statusText : "Something went wrong",
    };
  }
};
