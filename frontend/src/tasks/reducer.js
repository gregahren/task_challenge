import {
    SELECT_TASK,
    ADD_TASK,
    LOAD_TASKS,
    SHOW_FINISHED,
    TASKS_LOADING,
    UPDATE_TASK,
    DELETE_TASK,
} from './action_types';

const initialState = {
    tasks: false,
    selectedTask: null,
    showFinished: false,
    tasksLoading: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TASKS: return { ...state, tasks: action.payload };
        case ADD_TASK: return { ...state, tasks: [action.payload, ...state.tasks] };
        case SELECT_TASK: return { ...state, selectedTask: action.payload.task };
        case SHOW_FINISHED: return { ...state, showFinished: !state.showFinished };
        case TASKS_LOADING: return { ...state, tasksLoading: action.payload };
        case UPDATE_TASK: 
            return { 
                ...state,  
                tasks: state.tasks.map(task => {
                    if (task.private_id === action.payload.task.private_id) {
                        return action.payload.task;
                    }
            
                    return task;
                }),
                selectedTask: null
            }
        case DELETE_TASK:
            return { 
                ...state,  
                tasks: state.tasks.filter(task => {
                    if (task.private_id === action.payload.task.private_id) {
                        return false;
                    }
            
                    return true;
                }),
                selectedTask: null
            }
        default:
            return state;
    }
}