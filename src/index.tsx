import React {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import './index.scss';
import App from './App';
import {store} from "./store";
import Header from "./components/Header/Header";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header/>
      <App/>
    </BrowserRouter>
  </Provider>
);
