import { 
    EuiButtonIcon,
    EuiFlexGroup,
    EuiFlexItem,
    EuiToolTip,
    EuiEmptyPrompt,
 } from '@elastic/eui';

 import './css/TaskList.css';

const TaskList = ({tasks, onSelectTask, onFinishTask, showFinished}) => (
    <>
        <ul className='TaskList'>
            {tasks && tasks.map((task, index) => 
                { return ((!task.completed || (showFinished && task.completed)) && 
                <li className='TaskList__Task' onClick={() => onSelectTask(task, index)} key={task.private_id}>
                    <EuiFlexGroup justifyContent='center' alignItems='center' responsive={false}>
                        <EuiFlexItem grow={false}>
                            <EuiToolTip content={task.completed ? null : 'Finish task'}>
                                <EuiButtonIcon
                                    aria-label={'Finish task'}
                                    iconType={task.completed ? 'stopFilled': 'stop'}
                                    iconSize='xl'
                                    onClick={(e) => {
                                        onFinishTask(task, index);
                                        e.stopPropagation();
                                    }}
                                />
                            </EuiToolTip>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            {task.completed ? <div style={{textDecoration: 'line-through'}}>{task.title}</div> : <div>{task.title}</div>}
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </li>)}
            )}
            {tasks && tasks.length < 1 && 
                <EuiEmptyPrompt
                    iconType="editorStrike"
                    title={<h2>You have no tasks</h2>}
                    body={
                        <p>
                            It seems you have no tasks to finish.
                        </p>
                    }
                />
            }
        </ul>
    </>
);

export default TaskList;