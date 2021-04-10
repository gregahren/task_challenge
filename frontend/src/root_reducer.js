import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth/reducer';
import taskReducer from './tasks/reducer';

const rootReducer = combineReducers({
    form,
    auth: authReducer,
    task: taskReducer,
});

export default rootReducer;
