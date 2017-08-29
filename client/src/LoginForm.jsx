import React, { Component } from 'react';
import TextFieldGroup from './common/TextFieldGroup.jsx';
import validateInput from '../../server/validations/login.js'
import { connect } from 'react-redux';
import { login } from '../actions/loginActions.jsx'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors })
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.login(this.state).then(
        (res) => {
          this.context.router.history.push('/matchmaker');
          window.location.reload();
        },
        (err) => this.setState({ errors: err.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;
    return (
      <div id="page-top" className="page-top" data-spy="scroll" data-target=".navbar-custom">

        <section id="login" className="login">
          <div>
            <video autoPlay loop muted src="/loginVid.mp4" />
          </div>
          <div className="formdiv">
            <form onSubmit={this.onSubmit} >
              <h1>Account Login</h1>

              {errors.form && <div className="alert alert-danger"> {errors.form}</div>}

              <TextFieldGroup
                field="identifier"
                label="Username / Email"
                value={this.state.identifier}
                error={errors.identifier}
                onChange={this.onChange} />

              <TextFieldGroup
                field="password"
                label="Password"
                value={this.state.password}
                error={errors.password}
                onChange={this.onChange}
                type="password" />

              <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

LoginForm.propsTypes = {
  login: React.PropTypes.func.isRequired
}
LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);