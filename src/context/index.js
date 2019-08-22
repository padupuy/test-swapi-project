import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';

function AppProviders({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

AppProviders.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppProviders;
