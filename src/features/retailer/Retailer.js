import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useFetchRetailerInfo } from './redux/hooks';
import {
  useParams
} from "react-router-dom";

export default function Retailer(props) {
  const { id } = useParams();
  console.log(id);
  const { fetchRetailerInfo } = useFetchRetailerInfo();


  useEffect(() => {
    fetchRetailerInfo(id);
  }, []); // eslint-disable-line

  return (
    <div className="retailer-retailer">
      Component content: retailer/Retailer
    </div>
  );
};

Retailer.propTypes = {};
Retailer.defaultProps = {};
