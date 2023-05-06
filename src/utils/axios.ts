import axios, {AxiosResponse} from 'axios'
import {BASE_URL} from "../config.ts";
import {store} from "../redux/store.ts";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = store.getState().auth.accessToken;
    console.log(accessToken);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

export default axiosInstance