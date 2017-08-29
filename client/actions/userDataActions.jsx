import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken.jsx';
import jwt from 'jsonwebtoken';

export function currentUserDataRequest() {
  return dispatch => {
    return axios.get('/api/userdata').then(res => {
      return res.data;
    });
  }
}

export function userUpdateProfile(userProfileData) {
  return dispatch => {
    return axios.post('/api/profileupdate', userProfileData).then(res => {
      return res.data;
    });
  }
}