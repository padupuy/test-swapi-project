import ReactGA from 'react-ga';

export function initAnalyticsTracker() {
  ReactGA.initialize(window.app.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
}

export async function trackScreen(pathname) {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
}
