import React from 'react';
import { VALIDATION_REQUIRED, VALIDATION_EMAIL_PATTERN, VALIDATION_PASS_MINLENGTH } from '../../src/common/constants/translation';

export const generateErrorTextName = (type) => {

  if(!type) {
    return null;
  }

  if(type === "required") {
    return VALIDATION_REQUIRED;
  }
}

export const generateErrorTextEmail = (type) => {

  if(!type) {
    return null;
  }

  if(type === "required") {
    return VALIDATION_REQUIRED;
  }

  if(type === "pattern") {
    return VALIDATION_EMAIL_PATTERN;
  }
}

export const generateErrorTextPassword = (type) => {
  
  if(!type) {
    return null;
  }

  if(type === "required") {
    return VALIDATION_REQUIRED;
  }

  if(type === "minLength") {
    return VALIDATION_PASS_MINLENGTH;
  }
}
