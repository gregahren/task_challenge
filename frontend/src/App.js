import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    EuiPageTemplate,
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFieldText,
    EuiButtonEmpty,
    EuiToolTip,
    EuiSpacer,
    EuiButtonIcon,
  } from '@elastic/eui';

import './App.css';
import RequireAuth from './auth/components/RequireAuth';
import { 
    logoutUser,
} from './auth/actions';
import TaskList from './tasks/components/TaskList';
import { 
    loadTasks, 
    addTask,
    finishTask,
    selectTask,
    toggleFinished,
} from './tasks/actions';
import TaskEdit from './tasks/components/TaskEdit';

const App = (props) => {
    const [taskTitle, setTaskTitle] = useState("");
        
    useEffect(() => {props.loadTasks()});
    
    return (
        <EuiPageTemplate
          restrictWidth={true}
          template="default"
          pageHeader={{
            iconType: 'visTable',
            pageTitle: 'My tasks',
            rightSideItems: [<EuiButton onClick={props.logoutUser}>Logout</EuiButton>],
          }}>
          <EuiFlexGroup justifyContent="spaceAround">
            <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceAround">
                    <EuiFlexItem>
                        <EuiFieldText
                            autoFocus="autofocus"
                            placeholder="Add task"
                            fullWidth={true}
                            value={taskTitle}
                            onChange={e => setTaskTitle(e.target.value)}
                            append={
                                <EuiToolTip content="Click to add task">
                                    <EuiButtonEmpty 
                                        size="l"
                                        isDisabled={!taskTitle && taskTitle.length < 1}
                                        onClick={() => {
                                            props.addTask(taskTitle);
                                            setTaskTitle('');
                                        }}
                                    >
                                        Add task
                                    </EuiButtonEmpty>
                                </EuiToolTip>
                            }
                        />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiToolTip
                            content={props.showFinished ? 'Hide finished' : 'Show finished'}
                        >
                            <EuiButtonIcon
                                aria-label={'Show/Hide finished tasks'}
                                aria-pressed={props.showFinished}
                                color={props.showFinished ? 'primary' : 'subdued'}
                                size='m'
                                iconType='returnKey'
                                onClick={() => {
                                    props.toggleFinished()
                                }}
                            />
                        </EuiToolTip>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer />
                <TaskList 
                    tasks={props.tasks} 
                    onFinishTask={props.finishTask}
                    onSelectTask={props.selectTask}
                    showFinished={props.showFinished}
                />
                <TaskEdit />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageTemplate>
    );
};

function mapStateToProps(state) {
    return {
        tasks: state.task.tasks,
        showFinished: state.task.showFinished
    };
}

export default connect(mapStateToProps, {
    loadTasks,
    addTask,
    finishTask,
    selectTask,
    toggleFinished,
    logoutUser,
})(RequireAuth(App));