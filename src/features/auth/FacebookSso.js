import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useLoginSso } from './redux/hooks';
import { LOGIN_FACEBOOK } from '../../common/constants/api';

// import PropTypes from 'prop-types';

export default function FacebookSso() {

  const { loginSso, loginSsoError } = useLoginSso();

  const callback = (response) => {
    loginSso(response.accessToken, response.userID, LOGIN_FACEBOOK);
  }

  return (
    <div className="auth-facebook-sso">
      <FacebookLogin
        appId="2861392230584383"
        autoLoad
        callback={callback}
        render={renderProps => (
          <button onClick={renderProps.onClick}>This is my custom FB button</button>
        )}
      />
    </div>
  );
};

FacebookSso.propTypes = {};
FacebookSso.defaultProps = {};
