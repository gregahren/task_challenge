import axios from 'axios';
import { API_URL } from '../config';
import { store } from '../index';
import { logoutUser } from '../auth/actions';

export function setHttpInterceptors() {
    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.post['Content-Type'] = 'appication/json';

    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                store.dispatch(logoutUser()); // if unathorized
            }
        }
        return Promise.reject(error);
    });

    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = `${token}`;
        return config;
    });
}