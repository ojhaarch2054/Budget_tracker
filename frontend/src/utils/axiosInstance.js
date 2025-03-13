import axios from "axios";

//create custom axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  //ensuring cookies are included in requests
  withCredentials: true,
});

//request interceptor to handle any additional configurations if needed
axiosInstance.interceptors.request.use(
  (config) => {
    //no need to add token to the header manually as it is handled by withCredentials
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor to handle token expiry and refresh
axiosInstance.interceptors.response.use(
  //if response is successful return it
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //mark request as retried
      originalRequest._retry = true;

      try {
        //make a request to refresh the token
        const response = await axios.post(
          "http://localhost:3000/refresh-token",
          {},
          {
            //ensuring cookies are included in the request
            withCredentials: true,
          }
        );

        //if refresh token is valid
        const newToken = response.data.token;
        //update access token in localStorage
        localStorage.setItem("token", newToken);

        //retry the original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        //retry the request
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        //handle the case when refresh token fails
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        //redirect to login page
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
