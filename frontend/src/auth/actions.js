import axios from 'axios';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
} from './action_types';
import history from '../utils/history';

export function loginUser(values, dispatch, props) {
    return axios.post(`/auth/login`, values).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', JSON.stringify(response.data.name));
            dispatch({ type: AUTH_USER });
            history.push('/');
        }).catch((err) => {
            if (err.response) {
                debugger;
                if (err.response.status === 401) {
                    dispatch(authError(err.response.data.message));
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
            history.push('/');
        }).catch((err) => {
            if (err.response) {
                if (err.response.status === 401) {
                    dispatch(authError(err.response.data.message));
                }
            } else {
                dispatch(authError(`${err.message}. Cannot log in.`));
            }
        });
}

export function logoutUser() {
    return function (dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: UNAUTH_USER });
        history.push('/login');
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}