import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { fetchAutocomplete } from './redux/actions';

export default function SearchAutocomplete() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.general.autocompleteList);

  return (
    <div className="general-search-autocomplete">
      <input onChange={(event) => dispatch(fetchAutocomplete(event.target.value))} />
      <ul>
        {list.map((result) => {
          return (
            <li key={result.id}>{result.name}</li>
          )
        })}
      </ul>
    </div>
  );
};

SearchAutocomplete.propTypes = {};
SearchAutocomplete.defaultProps = {};
