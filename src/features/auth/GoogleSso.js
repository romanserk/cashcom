import React from 'react';
import GoogleLogin from 'react-google-login';
import { useLoginSso } from './redux/hooks';
import { LOGIN_GOOGLE } from '../../common/constants/api';

export default function GoogleSso() {
  const { loginSso, loginSsoError } = useLoginSso();

  const onSuccess = (response) => {
    loginSso(response.tokenId, response.googleId, LOGIN_GOOGLE);
  }

  return (
    <div className="auth-google-sso">
      <GoogleLogin
        clientId="845867219797-eitauejpdejk1qh9p13eai9aai3j34be.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={(err) => console.log(err)}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

