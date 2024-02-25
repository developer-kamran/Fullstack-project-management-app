import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

import { ApolloProvider, ApolloClient } from '@apollo/client';
import { cache } from './utils';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);
