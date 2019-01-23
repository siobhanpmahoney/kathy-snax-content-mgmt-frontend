import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';




const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
);

store.subscribe(() => {
  store.getState()
});

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <App />
</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
