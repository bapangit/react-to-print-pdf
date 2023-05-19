import CryptoJS from "crypto-js";

const encryptedKey = "cfcfcgjh-hghgh-3hgh4ge-6refcg-hgfhf75rtdcgfcbv";

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptedKey).toString();
};

export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptedKey);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};

export const getSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    const result = decryptData(data);
    return result;
  }
  return null;
};

export const checkAuthExist = () => {
  const userData = getSessionStorage("userData");
  if (userData) {
    const userSession = JSON.parse(userData);
    if (userSession && userSession.Token && userSession.User && userSession.LoggedInUser) {
      return true;
    }
    return false;
  }
  return false;
};

export const clearSession = () => {
  setSessionStorage("userData", "");
};

// export const checkAuthExist = () => {
//   const userData = getSessionStorage("userData");
//   if (userData) {
//     const userSession = JSON.parse(userData);
//     const expiryDate = userData.token;
//     if (userSession) {
//       const date = new Date(expiryDate);
//       const now = new Date();
//       if (date > now) {
//         return true;
//       }
//       return true;
//     }
//     return true;
//   }
//   return true;
// };

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    const result = JSON.parse(data);
    return result;
  }
  return null;
};

export const setSessionStorage = (key, data) => {
  // sessionStorage.setItem(key, JSON.stringify(data));
  const encryptedData = encryptData(data);
  sessionStorage.setItem(key, encryptedData);
};

export const setEncryptSessionStorage = (key, data) => {
  const encryptedData = encryptData(data);
  sessionStorage.setItem(key, encryptedData);
};

export const getDecryptSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    const result = decryptData(data);
    return result;
  }
  return null;
};
