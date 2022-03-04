import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';
import './css/iconos.css';

// for redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

// import reportWebVitals from './reportWebVitals';

const store = createStore(
  reducers,
  {}, // initial State
  applyMiddleware(reduxThunk)
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
