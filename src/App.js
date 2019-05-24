import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

import AuthService from './utils/AuthService';
import withAuth from './utils/withAuth';

const Auth = new AuthService();

class App extends Component {

    handleLogout(){
        Auth.logout();
        this.props.history.replace('/');
    }

    render(){
        const { classes } = this.props;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Welcome <code><h3>{this.props.user.username}</h3></code>
                    </p>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={this.handleLogout.bind(this)}
                    >
                        Logout
                    </Button>
                </header>
            </div>
        );
    }
}

export default withAuth(App);