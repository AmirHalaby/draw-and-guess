import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import { DrawStore} from './stores/DrawStore.js';

  const drawStore = new DrawStore();

  const store = {
    drawStore
  }

  ReactDOM.render(
    <React.StrictMode>
      <Provider {...store}>
          <App />
      </Provider>
    </React.StrictMode>
  ,document.getElementById('root'));


reportWebVitals();
