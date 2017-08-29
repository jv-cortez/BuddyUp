import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';


class LoginPage extends Component {
  render() {
    return (
      <div className="row">
        <div>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
