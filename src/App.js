import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AuthService from './utils/AuthService';
import withAuth from './utils/withAuth';

const Auth = new AuthService();

class App extends Component {

    handleLogout(){
        Auth.logout();
        this.props.history.replace('/');
    }

    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Welcome {this.props.user.username}
                    </p>
                    <button
                        type="button"
                        className="form-submit"
                        onClick={this.handleLogout.bind(this)}
                    >
                        Logout
                    </button>
                </header>
            </div>
        );
    }
}

export default withAuth(App);