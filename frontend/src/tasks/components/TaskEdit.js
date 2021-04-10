import { useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { 
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutFooter,
    EuiFlexGroup,
    EuiFlexItem,
    EuiButtonEmpty,
    EuiButton,
    EuiForm,
    EuiConfirmModal,
} from '@elastic/eui';

import { renderEuiFieldText, renderEuiFieldTextArea } from '../../utils/renderEuiField';
import { selectTask, updateTask, deleteTask } from '../actions';
import { required } from '../../utils/validators';

const TaskEdit = (props) => {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const closeDeleteModal = () => setIsDeleteModalVisible(false);
    const deleteTask = (task) => {
        props.deleteTask(task);
        setIsDeleteModalVisible(false);
    };
    const showDeleteModal = () => setIsDeleteModalVisible(true);
    
    const closeFlyout = () => selectTask(null, null);
    const { initialValues, selectTask, handleSubmit, submitting } = props;

    return initialValues && (
        <>
            <EuiForm
                component="form"
                onSubmit={handleSubmit}
                isInvalid={props.isValid}
                error={props.errorMessage}
            >
                <EuiFlyout
                    ownFocus
                    onClose={closeFlyout}
                    size='m'
                    aria-labelledby="flyoutLargeTitle">
                    <EuiFlyoutBody>
                        <Field
                            label="Title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            fullWidth
                            validate={[required]}
                            component={renderEuiFieldText}
                        />
                        <Field
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Description"
                            fullWidth
                            component={renderEuiFieldTextArea}
                        />
                    </EuiFlyoutBody>
                    <EuiFlyoutFooter>
                        <EuiFlexGroup justifyContent="spaceBetween">
                            <EuiFlexItem grow={false}>
                                <EuiButtonEmpty
                                    iconType="cross"
                                    onClick={closeFlyout}
                                    flush="left">
                                    Close
                                </EuiButtonEmpty>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiFlexGroup justifyContent="spaceBetween">
                                    <EuiFlexItem grow={false}>
                                        <EuiButton type="button" fill isLoading={submitting} color='danger' onClick={showDeleteModal}>
                                            Delete
                                        </EuiButton>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={false}>
                                        <EuiButton type="submit" fill isLoading={submitting}>
                                            Save task
                                        </EuiButton>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiFlyoutFooter>
                </EuiFlyout>
            </EuiForm>

            { isDeleteModalVisible && 
                <EuiConfirmModal
                    title={`Delete task ${props.initialValues.title}`}
                    onCancel={closeDeleteModal}
                    onConfirm={() => deleteTask(props.initialValues)}
                    cancelButtonText="No, don't do it"
                    confirmButtonText="Yes, do it"
                    buttonColor="danger"
                    defaultFocusedButton="confirm">
                    <p>You&rsquo;re about to delete task.</p>
                    <p>Are you sure you want to do this?</p>
                </EuiConfirmModal>
            };
        </>
    );
};

function mapStateToProps(state) {
    return {
        // task: state.task.selectedTask,
        initialValues: state.task.selectedTask
    };
}

export default connect(mapStateToProps, {
    selectTask,
    deleteTask
})(reduxForm({
    form: 'taskEdit',
    enableReinitialize: true,
    onSubmit: updateTask,
})(TaskEdit));