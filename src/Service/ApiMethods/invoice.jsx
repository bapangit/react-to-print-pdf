import axios from "../../Configuration/axios/axios";
import { Buffer } from "buffer";
import publicIp from "public-ip";
import { clearSession, getSessionStorage } from "Service/AuthVerify/auth";
import { ApiEndPoints } from "../ApiEndPoints/endpoints";
const pako = require("pako");

export const createInvoice = async (requestData) => {
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
    console.log(request);
    const response = await axios.post(ApiEndPoints.Invoice.AddNewInvoice, request, {
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

// Get ItemMaster
export const getItemMaster = async () => {
  try {
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    const response = await axios.post(ApiEndPoints.Invoice.GetItemMaster, "", {
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
    return {
      ResponseCode: 0,
      ResponseData: null,
      ResponseMessage: error && error.response && error.response.data && error.response.statusText ? error.response.statusText : "Something went wrong",
    };
  }
};

// Get Company Address
export const getCompanyAddress = async (companyAddressID = 0) => {
  try {
    // const ip = await publicIp.v4();
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    let requestBody = {
      CompanyAddressID: companyAddressID,
    };

    const response = await axios.post(ApiEndPoints.Invoice.GetCompanyAddress, requestBody, {
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

// Get Invoice Category
export const getInvoiceCategory = async (seachText = "#ALL") => {
  try {
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    let requestBody = {
      SearchText: seachText,
    };
    const response = await axios.post(ApiEndPoints.Invoice.GetInvoiceCategory, requestBody, {
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

// Get GST category
export const getGSTCategory = async (seachText = "#ALL") => {
  try {
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    let requestBody = {
      SearchText: seachText,
    };
    const response = await axios.post(ApiEndPoints.Invoice.GetGSTCategory, requestBody, {
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

//Get Supplier
export const getSupplier = async (seachText = "#ALL") => {
  try {
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    let requestBody = {
      SearchText: seachText,
    };
    const response = await axios.post(ApiEndPoints.Invoice.GetSupplier, requestBody, {
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

//Get Customer
export const getCustomer = async (seachText = "#ALL") => {
  try {
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    let requestBody = {
      SearchText: seachText,
    };
    const response = await axios.post(ApiEndPoints.Invoice.GetCustomer, requestBody, {
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

export const getInvoice = async (requestData) => {
  //debugger;
  // try {
  //   if (!checkAuthExist()) {
  //     return { ResponseCode: 401, ResponseData: null, ResponseMessage: "Session Expired" };
  //   }
  //   const ip = await publicIp.v4();
  //   const user = getSessionStorage("userData");
  //   const request = {
  //     requestData,
  //     //   objCommon: {
  //     //     insertedUserID: user && user.AppAccessUID ? user.AppAccessUID : 0,
  //     //     insertedIPAddress: ip,
  //     //     token: "yyyy-MM-dd",
  //     //     dateLong: "yyyy-MM-dd HH:mm:ss",
  //     //   },
  //   };
  //   const response = await axios.post(ApiEndPoints.Invoice.GetAllInvoice, requestData, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: user && user.token && user.token.Token ? user.token.Token : "",
  //       UserName: user && user.UserName ? user.UserName : "",
  //       ...header,
  //     },
  //   });
  //   if (response && response.status === 200) {
  //     const result = await response.data;
  //     if (result.responseCode === 1) {
  //       const buff = Buffer.from(result.responseDynamic ? result.responseDynamic : "", "base64");
  //       if (buff.length !== 0) {
  //         const data = JSON.parse(pako.inflate(buff, { to: "string" }));
  //         return { responseCode: 1, responseData: data, responseMessage: result.responseMessage };
  //       }
  //       return { responseCode: 1, responseData: [], responseMessage: result.responseMessage };
  //     }
  //     return { responseCode: Number(result.responseCode), responseData: null, responseMessage: result.responseMessage };
  //   }
  //   return { responseCode: 0, responseData: null, responseMessage: "" };
  // } catch (error) {
  // if (error && error.response && error.response.status === 401) {
  //   clearSession();
  //   return { ResponseCode: 401, ResponseData: null, ResponseMessage: "Session Timeout,Please Login." };
  // }
  //   console.log(error);
  //   return {
  //     responseCode: 0,
  //     responseData: null,
  //     responseMessage: error && error.response && error.response.data && error.response.statusText ? error.response.statusText : "Something went wrong",
  //   };
  // }
};

//Get Customer or Supplier Address
export const getBRAddress = async (brId) => {
  try {
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    let requestBody = {
      BRID: brId,
    };
    const response = await axios.post(ApiEndPoints.Invoice.GetBRAddress, requestBody, {
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

//Get Invoice Charge Master Data
export const getInvoiceChargeMaster = async (seachText = "#ALL") => {
  try {
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    let requestBody = {
      SearchText: seachText,
    };
    const response = await axios.post(ApiEndPoints.Invoice.GetInvoiceChargeMaster, requestBody, {
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

export const getInvoiceListData = async (requestData) => {
  //debugger;
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

    const response = await axios.post(ApiEndPoints.Invoice.GetInvoiceList, request, {
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

export const GetInvoiceForEdit = async (invoiceId) => {
  //debugger;
  try {
    const ip = await publicIp.v4();
    const userSession = getSessionStorage("userData");
    const userData = JSON.parse(userSession);
    const requestData = {
      InsertUserID: userData.User.ID,
      InvoiceID: invoiceId,
      ViewMode: "HD",
    };

    const response = await axios.post(ApiEndPoints.Invoice.GetInvoiceData, requestData, {
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
