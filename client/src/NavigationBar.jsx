import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions.jsx'
import { DropdownButton } from 'react-bootstrap';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';



class NavigationBar extends Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.context.router.history.push('/')
  }

  render () {

    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <IconMenu 
        iconButtonElement={<IconButton><MenuIcon /></IconButton>} 
        anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem containerElement={<Link to="/profile" />} primaryText="Profile" />
        <MenuItem href="#" onClick={this.logout.bind(this)}>Logout</MenuItem>
      </IconMenu>
    );

    const guestLinks = (
      <IconMenu 
      iconButtonElement={<IconButton><MenuIcon /></IconButton>} 
      anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem containerElement={<Link to="/login" />} primaryText="Login" />        
        <MenuItem containerElement={<Link to="/signup" />} primaryText="Sign up" />
      </IconMenu>
    );
      
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/matchmaker" className="navbar-brand">Buddy Up</Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              { isAuthenticated ? userLinks : guestLinks }  
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.PropTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);