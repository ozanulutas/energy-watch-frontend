import axios from "axios"

// axios instance for api calls
const axiosInstance = axios.create();

// get values from .env
const { 
  VUE_APP_API_URL: API_URL,
} = process.env

const user = JSON.parse(localStorage.getItem("user"))

// set default axios values to use in api calls
axiosInstance.defaults.baseURL = API_URL;
axiosInstance.defaults.headers.common['x-access-token'] = user && user.token;
// axiosInstance.defaults.params = {}
// axiosInstance.defaults.params['apikey'] = API_KEY

export default axiosInstance;