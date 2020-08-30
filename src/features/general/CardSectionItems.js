import React from 'react';
import CardSectionItem from './CardSectionItem';

export default function CardSectionItems(props) {
  return (
    <div className="section__item__container">
      <div className="section__item__container__inner">
        {props.items.map(item => (
          <CardSectionItem
            info="3% Cashback"
            previousInfo="was 2%"
            overlayText=""
            endTime="Ends: Today"
          ></CardSectionItem>
        ))}
      </div>
    </div>
  );
}
