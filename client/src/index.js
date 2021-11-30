import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css';      // css framework Ant Design style sheet

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,  // 이 부분이 화면에 보여주고 싶은 컴포넌트를 넣는 부분
  document.getElementById('root')     // public/index.html에 있는 element를 id로 잡아, 그 element에 보여줄 것을 첫번째 매개변수(윗줄)라 정의
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
