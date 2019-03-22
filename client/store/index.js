import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const development = composeEnhancers(
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);
const production = applyMiddleware(thunk);

export const store =
  process.env.NODE_ENV === 'development'
    ? createStore(reducer, development)
    : createStore(reducer, production);

export default props => <Provider store={store}>{props.children}</Provider>;
