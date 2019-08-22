import React from 'react';
import { ContentLayout, Hero, PageLayout } from 'components';
import Search from './Search';
import Characters from './Characters';

import './Home.css';

const HeroImage = require('./undraw_may_the_force_bgdm.svg');

export default function Page() {
  return (
    <PageLayout>
      <Hero className="Home__Hero">
        <div className="Home__Hero__Title">
          <h1>Star Wars Explorer</h1>
          <h2>May the force be with you</h2>
        </div>
        <img src={HeroImage} alt="Star Wars illustration" width="300" />
      </Hero>
      <Search />
      <ContentLayout>
        <Characters />
      </ContentLayout>
    </PageLayout>
  );
}
