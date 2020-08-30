import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

const useFetching = (action) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action());
  }, []); // eslint-disable-line
};

export default useFetching;
