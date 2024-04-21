import axios from "axios";

export const getBaseUrl = async () => {
  console.log("url value is ::: ")
  return "http://localhost:8080";
};

export const handleSessionExpired = () => {
    // window.location.href = `${process.env.SERVICE_URL}logout?redirectTo=${window.location.href}`;
};

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      handleSessionExpired();
    }
    return Promise.reject(error);
  }
);

const get = <T>(
  endpoint: string,
  params?: Record<string, any>,
  headers?: Record<string, string | number | boolean>
): Promise<T> =>
  new Promise(async (resolve, reject) => {
    const baseURL = await getBaseUrl();
    return axios
      .get(baseURL + endpoint, {
        params,
        data: {},
        headers: headers || {
          "Content-Type": "application/json",
          ...({ Cookie: document.cookie }),
        },
        withCredentials: true
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });

const post = <T>(
  endpoint: string,
  data: object,
  contentType?: string,
  params?: Record<string, any>
): Promise<T> =>
  new Promise(async (resolve, reject) => {
    const baseURL = await getBaseUrl();
    const headers = {
      "Content-Type": contentType ? contentType : "application/json",
      ...({ Cookie: document.cookie }),
    };
    axios(baseURL + endpoint, {
      method: "POST",
      data: contentType === "multipart/form-data" ? data : JSON.stringify(data),
      headers,
      params,
      withCredentials: true
    })
      .then(async (response) => {
        const content = await response.data;
        return typeof content === "string"
          ? JSON.parse(content === "" ? JSON.stringify({}) : content)
          : content;
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

const put = <T>(
  endpoint: string,
  data: object,
  params?: Record<string, any>,
  contentType?: string
): Promise<T> =>
  new Promise(async (resolve, reject) => {
    const baseURL = await getBaseUrl();
    const headers = {
      "Content-Type": contentType ? contentType : "application/json",
      ...({ Cookie: document.cookie }),
    };
    axios(baseURL + endpoint, {
      method: "PUT",
      data: contentType === "multipart/form-data" ? data : JSON.stringify(data),
      params,
      headers,
      withCredentials: true
    })
      .then(async (response) => {
        const content = await response.data;
        return typeof content === "string"
          ? JSON.parse(content === "" ? JSON.stringify({}) : content)
          : content;
      })
      .then((data: any) => {
        if (data.error) {
          reject(data);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

const remove = (
  endpoint: string,
  params?: Record<string, any>,
  headers?: Record<string, string | number | boolean>
): Promise<void> =>
  new Promise(async (resolve, reject) => {
    const baseURL = await getBaseUrl();
    headers = {
      ...({ Cookie: document.cookie }),
    };
    axios
      .delete(baseURL + endpoint, {
        params,
        headers,
        withCredentials: true
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

const api = {
  get,
  post,
  put,
  remove,
};

export default api;
