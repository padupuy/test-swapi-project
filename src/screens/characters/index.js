import React from 'react';
import queryString from 'query-string';
import { ContentLayout, Hero, PageLayout } from 'components';
import CharacterList from './CharacterList';

const HeroImage = require('./bg_troopers.jpg');

export default function Page({ location }) {
  const { page } = queryString.parse(location.search);
  const currentPage = parseInt(page, 10) || 1;

  return (
    <PageLayout>
      <Hero background={HeroImage}></Hero>
      <ContentLayout title={'Characters'}>
        <CharacterList page={currentPage} pathname={location.pathname} />
      </ContentLayout>
    </PageLayout>
  );
}
