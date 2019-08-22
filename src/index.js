import React from 'react';
import ReactDOM from 'react-dom';
import App from 'screens/App';
import AppProviders from 'context';
import { initErrorTracker } from 'services/error';
import { initAnalyticsTracker } from 'services/analytics';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

initErrorTracker();
initAnalyticsTracker();

function render(Component) {
  ReactDOM.render(
    <AppProviders>
      <Component />
    </AppProviders>,
    rootEl
  );
}

render(App);

if (module.hot) {
  module.hot.accept('screens/App', () => {
    const NextApp = require('screens/App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
