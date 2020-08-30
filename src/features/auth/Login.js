import React  from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { generateErrorTextEmail, generateErrorTextPassword } from '../../common/validation';
import FacebookSso from './FacebookSso';
import GoogleSso from './GoogleSso';
import { useLogin } from './redux/hooks';
import {
  useHistory,
} from "react-router-dom";
import { EMAIL_PATTERN } from '../../common/constants/validation';

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const { login, loginError } = useLogin();
  const history = useHistory();
  const onSubmit = data => login(data, () => history.replace('/home'));
  const [t, i18n] = useTranslation();

  return (
    <>
    <FacebookSso />
    <GoogleSso />
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
          <input
              type='checkbox'
              name="terms"
              ref={register({ required: true })}
          />
          <div>{'labelText'}</div>
      </label>
      {errors.terms && t('VALIDATION_TERM_REQUIRED')}

      <input name="email" type="email" ref={register({ required: true, pattern: EMAIL_PATTERN })} />
      {errors.email && t(generateErrorTextEmail(errors.email.type))}
      <input name="password" type="password" ref={register({ required: true, minLength: 6 })} />
      {errors.password && t(generateErrorTextPassword(errors.password.type))}
      <input type="submit" />
    </form>
    </>
  );
}

Login.propTypes = {};
Login.defaultProps = {};
