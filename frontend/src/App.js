import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

// import Header from './Header';
// import Main from './Main';
import './App.css';
import RequireAuth from './auth/components/RequireAuth';
import { store } from './index';
// import { CLEAR_ERRORS } from '../actions/types';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thisYear: moment().year(),
        }
    }

    renderErrors() {
        return this.props.errors.map((err, val) => {
            return (<div key={val}><i style={{ color: 'red' }}>{err}</i><br /></div>);
        });
    }

    hideErrorContainer() {
        // store.dispatch({ type: CLEAR_ERRORS });
    }

    render() {
        return (
            <div>tasks</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // errors: state.core.errors
    };
}

export default connect(mapStateToProps)(RequireAuth(App));