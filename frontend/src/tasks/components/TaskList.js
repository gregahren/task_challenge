import { 
    EuiButtonIcon,
    EuiFlexGroup,
    EuiFlexItem,
    EuiToolTip,
 } from '@elastic/eui';

 import './css/TaskList.css';

const TaskList = ({tasks, onSelectTask, onFinishTask, showFinished}) => (
    <>
        <ul className='TaskList'>
            {tasks && tasks.map((task, index) => 
                { return ((!task.completed || (showFinished && task.completed)) && 
                <li className='TaskList__Task' onClick={() => onSelectTask(task, index)} key={task.private_id}>
                    <EuiFlexGroup justifyContent='center' alignItems='center'>
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
        </ul>
    </>
);

export default TaskList;