import axios from "axios";
import { toastError, toastSuccess } from "./notify";

const domain = "http://127.0.0.1:8000/api/";

export async function signUp(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${domain}Users/Register`, data, {
        withCredentials: true,
      });

      if (res.status === 201) {
        resolve("success");
      }
    } catch (err) {
      toastError("There is a user with this email");
    }
  });
}

export async function login(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${domain}Users/Login`, data, {
        withCredentials: true,
      });

      console.log(res);

      if (res.status === 200) {
        resolve(res.data);
      }
    } catch (err) {
      toastError("There is a user with this email");
    }
  });
}

export async function updateUser(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.put(
        `${domain}Users/UpdateUserByEmail/${data.Email}`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log(res);
      if (res.status === 204) {
        resolve("success");
      }
      reject("error");
    } catch (err) {
      console.log(err);
    }
  });
}

export async function createWebsite(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${domain}Users/Register`, data, {
        withCredentials: true,
      });

      if (res.status === 201) {
        resolve("success");
      }
    } catch (err) {
      toastError("There is a user with this email");
    }
  });
}
