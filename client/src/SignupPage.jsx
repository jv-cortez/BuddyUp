import React, { Component } from 'react';
import SignupForm from './SignupForm.jsx';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupActions.jsx'
import PropTypes from 'prop-types';


class SignupPage extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
        <div>
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest })(SignupPage);
