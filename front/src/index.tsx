import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from 'app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/pt_BR';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
