import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RTLContext } from '../../common/hooks/useRTL';
import { SearchAutocomplete } from '../general';
import HomeCategories from './HomeCategories';
import { useSelector } from "react-redux";
import { useFetchHomeSections } from './redux/hooks';
import CardSection from '../general/CardSection'


export default function Home() {
    const [t, i18n] = useTranslation();
    const sections = useSelector(state => state.home.homeSections);
    const { fetchHomeSections, homeSections } = useFetchHomeSections();

  useEffect(() => {
      fetchHomeSections('default');
    }, [fetchHomeSections]);
  
  return (
   <div className='container'>
    <div>{t("home.home.check")}</div>
    <SearchAutocomplete />
    <HomeCategories />
    <CardSection title="Best cash back Offers" description="checking" items={['a','b','c','d','e','f','g','h']}/>
   </div>
  );
}
