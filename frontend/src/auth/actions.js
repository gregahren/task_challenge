import axios from 'axios';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
} from './action_types';

export function loginUser(values, dispatch, props) {
    return axios.post(`/auth/login`, values).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', JSON.stringify(response.data.name));
            dispatch({ type: AUTH_USER });
            props.history.push('/');
        }).catch((err) => {
            if (err.response) {
                if (err.response.status === 401) {
                    dispatch(authError(err.response.message));
                }
            } else {
                dispatch(authError(`${err.message}. Cannot log in.`));
            }
        });
}

export function registerUser(values, dispatch, props) {
    return axios.post(`/user/`, values).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', JSON.stringify(response.data.name));
            dispatch({ type: AUTH_USER });
            props.history.push('/');
        }).catch((err) => {
            if (err.response) {
                if (err.response.status === 401) {
                    dispatch(authError(err.response.message));
                }
            } else {
                dispatch(authError(`${err.message}. Cannot log in.`));
            }
        });
}

export function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { type: UNAUTH_USER };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}