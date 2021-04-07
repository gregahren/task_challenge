import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { withRouter, Redirect } from 'react-router-dom';
import { renderEuiFieldText } from '../../utils/renderEuiField';
import { required, email, minLength } from '../../utils/validators';
import {
    EuiPage,
    EuiPageContent,
    EuiPageBody,
    EuiForm,
    EuiFlexItem,
    EuiButton,
    EuiHorizontalRule,
    EuiLink,
    EuiFlexGroup,   
    EuiText,
} from '@elastic/eui';

import { registerUser } from '../actions';
import history from '../../utils/history';
import { store } from '../../../src';
import '../css/Login.css';

const minLength6 = minLength(6);

function goToLogin() {
    history.push("/login");
};

const Register = props => {
    const { authenticated } = props;

    if (authenticated) {
        return <Redirect to='/' />;
    }

    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <div className="Login">
            <div className="Login__box">
                <EuiPage paddingSize="none">
                    <EuiPageBody>
                        <EuiPageContent>
                            <EuiText grow={false} textAlign="center">
                                <h2>Register account</h2>
                            </EuiText>
                            <EuiForm
                                component="form"
                                onSubmit={handleSubmit}
                                isInvalid={props.errorMessage}
                                error={props.errorMessage}
                            >
                                <Field
                                    label="Email"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    validate={[required, email]}
                                    component={renderEuiFieldText}
                                />
                                <Field
                                    label="Full name"
                                    name="name"
                                    type="text"
                                    placeholder="Full name"
                                    validate={[required, minLength6]}
                                    component={renderEuiFieldText}
                                />
                                <Field
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    validate={[required, minLength6]}
                                    component={renderEuiFieldText}
                                />

                                <br></br>

                                <EuiFlexItem grow={false}>
                                    <EuiButton type="submit" fill isLoading={submitting}>
                                        Register&hellip;
                                    </EuiButton>
                                </EuiFlexItem>
                            </EuiForm>
                            <EuiHorizontalRule size="half" />
                            <EuiFlexGroup justifyContent="spaceAround">
                                <EuiFlexItem grow={false}>
                                    <div>or <EuiLink onClick={goToLogin}>Go to Login Here</EuiLink></div>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiPageContent>
                    </EuiPageBody>
                </EuiPage>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(withRouter(reduxForm({
    form: 'register',
    onSubmit: registerUser
})(Register)));