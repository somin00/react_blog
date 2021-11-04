import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import rootReducer, { rootSaga } from './store';
import {applyMiddleware, createStore} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger();

const SagaMiddleware = createSagaMiddleware();

const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(logger,SagaMiddleware))); 

SagaMiddleware.run(rootSaga);

ReactDOM.render( 
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
