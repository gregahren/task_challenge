import axios from 'axios';

import {
    SELECT_TASK,
    UPDATE_TASK,
    ADD_TASK,
    LOAD_TASKS,
    SHOW_FINISHED,
    TASKS_LOADING,
    DELETE_TASK,
} from './action_types';

export function loadTasks() {
    return function (dispatch) {
        dispatch({type: TASKS_LOADING, payload: true});
        axios.get(`/task/`).then(response => {
            dispatch({ type: LOAD_TASKS, payload: response.data.data });
            dispatch({ type: TASKS_LOADING, payload: false });
        }).catch((err) => {
            dispatch({ type: TASKS_LOADING, payload: false });
        });
    }
}

export function addTask(title) {
    return function (dispatch) {
        axios.post(`/task/`, {title}).then(response => {
            dispatch({ type: ADD_TASK, payload: response.data });
        });
    }
}

export function finishTask(task, index) {
    const { title } = task;

    return function (dispatch) {
        axios.put(`/task/${task.private_id}`, {title, completed: true})
            .then(response => {
                dispatch({ type: UPDATE_TASK, payload: {index, task: response.data} });
            });
    }
}


export function deleteTask(task, index) {
    return function (dispatch) {
        axios.delete(`/task/${task.private_id}`)
            .then(response => {
                dispatch({ type: DELETE_TASK, payload: {task: response.data} });
            });
    }
}

export function selectTask(task, index) {
    return {
        type: SELECT_TASK,
        payload: {task, index}
    };
}

export function toggleFinished() {
    return {
        type: SHOW_FINISHED
    };
}

export function updateTask(values, dispatch, props) {
    return axios.put(`/task/${values.private_id}`, values).then(response => {
            dispatch({ type: UPDATE_TASK, payload: {task: response.data} });
        });
}