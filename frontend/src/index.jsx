import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import Home from './pages/Home';
import Add from './pages/Add';
import Article from './pages/Article';
import Admin from './pages/Administration';
import Compte from './pages/Compte';
import Error from './error/index';
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route exact path="" element={<Home />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="add" element={<div><Add /><Home /></div>} />
          <Route path="compte" element={<Compte />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Routes>
        <Route path="/article/:id" element={<Footer />} />
        <Route path="*" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);