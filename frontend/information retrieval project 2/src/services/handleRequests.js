import axios from "axios";
import { toastError, toastSuccess } from "./notify";

const domain = "http://127.0.0.11:8000/api/";

export async function signUp(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${domain}users/signup`, data, {
        withCredentials: true,
      });
      console.log(res);
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
      const res = await axios.post(`${domain}users/login`, data, {
        withCredentials: true,
      });
      console.log(res);

      if (res.data.status !== "fail") {
        resolve(res.data.data);
      }
      reject("error");
    } catch (err) {
      toastError("There is a user with this email");
    }
  });
}

export async function updateUser(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.patch(
        `${domain}users/${data.id}`,
        { name: data.name, email: data.email },
        {
          withCredentials: true,
        }
      );

      console.log(res);
      if (res.data.status === "success") {
        resolve("success");
      } else if (res.data.error.codeName === "DuplicateKey") {
        toastError("User exists with this email address already");
      }
      reject("error");
    } catch (err) {
      console.log(err);
    }
  });
}

export async function resetPassword(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${domain}users/resetPassword`, data, {
        withCredentials: true,
      });

      console.log(res);
      if (res.status === 200) {
        resolve("success");
      }
      toastError("current password is wrong.");
      reject("error");
    } catch (err) {
      console.log(err);
      toastError("current password is wrong.");
    }
  });
}

export async function addWebsite(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${domain}websites`, data, {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.status === "success") {
        resolve("success");
      } else if (res.data.status === "error") {
        toastError("Website exists with this domain");
        reject("error");
      }
    } catch (err) {
      toastError(err);
    }
  });
}

export async function updateWebsite(website) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(website);
      const res = await axios.patch(
        `${domain}websites/${website.id}`,
        { ...website },
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.status === "success") {
        resolve("success");
      } else if (res.data.status === "error") {
        toastError("Website exists with this domain");
        reject("error");
      }
    } catch (err) {}
  });
}

export async function deleteWebsite(website) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.delete(`${domain}websites/${website.id}`, {
        withCredentials: true,
      });
      console.log(res);

      if (res.data.status !== "fail") {
        resolve("success");
      } else {
        reject("error");
      }
    } catch (err) {}
  });
}

export async function getWebsiteByDomain(websiteDomain) {
  try {
    const res = await axios.get(`${domain}websites?domain=${websiteDomain}`);
    console.log(res.data.data.length);
    if (res.data.status === "success" && res.data.data.length !== 0) {
      return res.data.data[0];
    } else if (res.data.data.length === 0) {
      toastError("There is no website with this domain");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getAllWebsites() {
  try {
    const res = await axios.get(`${domain}websites`);
    console.log(res);
    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function createKeywords(data) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${domain}keywords`, data, {
        withCredentials: true,
      });

      console.log(res);

      if (res.data.status === "success") {
        resolve("success");
      }
    } catch (err) {
      toastError("Error");
    }
  });
}

export async function uploadKeywords(file) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.post(`${domain}keywords/uploadKeywords`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.data.status === "success") {
        resolve("success");
      }
    } catch (err) {
      toastError("Try again");
    }
  });
}

export async function getAllQueries() {
  try {
    const res = await axios.get(`${domain}queries`);
    console.log(res);
    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function uploadProfile(file) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.patch(`${domain}users/uploadProfile`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status === "success") {
        resolve(res.data.data);
      }
      reject("error");
    } catch (err) {
      toastError("Upload profile failed");
    }
  });
}
