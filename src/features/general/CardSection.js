import React from 'react';
import './CardSection.less';
import CardSectionItems from './CardSectionItems';
import { composeInitialProps } from 'react-i18next';

export default function CardSection(props) {
  return (
    <div className="section">
      <div>
        <span className="section__title">{props.title}</span>

        <span className="section__see-all-button">See All &gt;</span>
      </div>
      <div>
        {props.description && (
          <div>
            {/* <div className="section__description">{props.description}</div> */}
            {/* <div className="section__description__border"></div> */}
          </div>
        )}
      </div>
      <CardSectionItems items={props.items}></CardSectionItems>
    </div>
  );
}
