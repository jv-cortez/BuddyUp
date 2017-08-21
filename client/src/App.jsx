import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SignupPage from './SignupPage.jsx';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Greetings from './Greetings.jsx';
import NavigationBar from './NavigationBar.jsx';
import LoginPage from './LoginPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import MatchmakerPage from './MainApp/MatchmakerPage.jsx';
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <NavigationBar />
        <Route exact path="/" component={Greetings} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/matchmaker" render={() => ( isAuthenticated ? <MatchmakerPage/> : <Redirect to="/"/> )} />
        <Route path="/profileupdate" component={ProfileForm} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
