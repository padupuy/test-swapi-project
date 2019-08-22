import { version } from '../../../package.json';
import * as Sentry from '@sentry/browser';

export function initErrorTracker() {
  Sentry.init({
    dsn: window.app.REACT_APP_SENTRY_DSN,
    release: version,
    environment: process.env.NODE_ENV
  });
}
