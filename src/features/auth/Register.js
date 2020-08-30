import React  from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { generateErrorTextEmail, generateErrorTextPassword, generateErrorTextName } from '../../common/validation';
import { EMAIL_PATTERN } from '../../common/constants/validation';
import { useRegister } from './redux/hooks';
import FacebookSso from './FacebookSso';
import GoogleSso from './GoogleSso';
import {
  useHistory,
} from "react-router-dom";

export default function Register() {
  const { register, handleSubmit, errors } = useForm();
  const { register: registerUser, registerError } = useRegister();
  const history = useHistory();
  
  const onSubmit = data => registerUser(data, () => history.replace('/home'));
  const [t, i18n] = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <FacebookSso />
          <GoogleSso />
      <input name="name" type="text" ref={register({ required: true })} />
      {errors.name && t(generateErrorTextName(errors.name.type))}
      <input name="email" type="email" ref={register({ required: true, pattern: EMAIL_PATTERN })} />
      {errors.email && t(generateErrorTextEmail(errors.email.type))}
      <input name="password" type="password" ref={register({ required: true, minLength: 6 })} />
      {errors.password && t(generateErrorTextPassword(errors.password.type))}

      { registerError && registerError.message }
       {/* <label>
          <input
              type='checkbox'
              name="terms"
              ref={register({ required: true })}
          />
          <div>{'labelText'}</div>
      </label>
      {errors.terms && t('VALIDATION_TERM_REQUIRED')} */}
      <input type="submit" />
    </form>
  );
}