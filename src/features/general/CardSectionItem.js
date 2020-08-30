import React from 'react';
import './CardSection.less';
import clock_ends_img from '../../images/clock_ends_img.png';
import cashback_icon_svg from '../../images/cashback_icon_svg.svg';
import { temp_EbayLogoURL, temp_ItemImageBackgroundURL } from '../../common/constants/images';

export default function CardSectionItem(props) {
  return (
    <div className="section__item">
      <div className="section__item__image__container">
        <img
          className="section__item__image__background"
          alt="item top background"
          src={temp_ItemImageBackgroundURL}
        />
        <div className="section__item__duration">
          <span className="section__item__duration-text">{'48h flash sale'}</span>
        </div>
        <div className="section__item__image__overlay">
          <img src={temp_EbayLogoURL} alt="logo"></img>
          {/* {props.overlayText && (
            <div>
              <span>{props.overlayText}</span>
            </div>
          )} */}
        </div>
      </div>
      {/* <div className="section__item__name">This is Item Name</div> */}
      <div className="section__item__info__container">
        <div className="section__item__info">
          <img src={cashback_icon_svg} alt="cashback" />
          {props.info}
        </div>
        <div className="section__item__info__previous">{props.previousInfo}</div>
        {props.endTime && (
          <div className="section__item__info__end-time">
            <img src={clock_ends_img} alt="clock ends icon" />
            {props.endTime}
          </div>
        )}
      </div>
    </div>
  );
}
