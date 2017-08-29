import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from './common/TextFieldGroup.jsx';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { userUpdateProfile } from '../actions/userDataActions.jsx'

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      tagline: '',
      blurb: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {}, isLoading: true });
    this.props.userUpdateProfile(this.state).then(
      () => {
        this.context.router.history.push('/matchmaker');
      },
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div id="page-top" className="page-top" data-spy="scroll" data-target=".navbar-custom">
        <section id="profile" className="profile">
          <div>
            <img className="backgroundimg" src="/profilepage.jpg"/>
            <div id="snow"></div>
          </div>
          <div className="formdiv">
            <div className="text-center" className="form">
              <form onSubmit={this.onSubmit}>
                <h1>Profile Update</h1>
                  <TextFieldGroup
                    label="Tagline"
                    onChange={this.onChange}
                    value={this.state.tagline} 
                    maxlength="30"
                    field="tagline"
                    placeholder="30 characters or less"
                  />
                  <TextFieldGroup
                    label="Blurb"
                    onChange={this.onChange}
                    value={this.state.blurb}
                    field="blurb"
                    placeholder="200 characters or less"
                  />          

                  <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                      Update Profile
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

ProfileForm.propTypes = {
  userUpdateProfile: PropTypes.func.isRequired
}
ProfileForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { userUpdateProfile })(ProfileForm);