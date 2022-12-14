import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
import Register from './component/Register'
import Posts from './component/Posts'
import EditPost from './component/EditPost'
import CreatePost from './component/CreatePost'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route path="/" element={<App/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/posts' element={<Posts/>} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/edit-post/:id' element={<EditPost/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
