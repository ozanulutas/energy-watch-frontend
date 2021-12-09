import axios from "axios"

// axios instance for api calls
const axiosInstance = axios.create();

// get values from .env
const { 
  VUE_APP_API_URL: API_URL,
} = process.env

// set default axios values to use in api calls
axiosInstance.defaults.baseURL = API_URL;
axiosInstance.defaults.headers.common['x-access-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiMTFhNTRmZmQ2NTI4YWE3YTBlOWQxIiwibmFtZSI6Inp6emEiLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjM5MDg5ODA0LCJleHAiOjE2MzkwOTcwMDR9.us__MS8G6I49BvmT0N7ZwUmu5QmtEiARTcpkhuzaP_Q";
// axiosInstance.defaults.params = {}
// axiosInstance.defaults.params['apikey'] = API_KEY

export default axiosInstance;