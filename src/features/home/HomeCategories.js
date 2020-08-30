import React from 'react';
import { useSelector } from "react-redux";
import { fetchCategories } from '../general/redux/actions';
import useFetching from '../../common/hooks/useFetching';

export default function HomeCategories() {
  const list = useSelector(state => state.general.categories);

  useFetching(fetchCategories);

  return (
    <div className="home-home-categories">
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

HomeCategories.propTypes = {};
HomeCategories.defaultProps = {};
