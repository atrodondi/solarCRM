import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import ContactProfilePage from './pages/contactProfilePage/contactProfilePage';

export default function App(props) {
  //render
  return (
    <Router>
      <div>
        <Route path='/' exact component={Dashboard} />
        <Route path='/contactProfile' exact component={ContactProfilePage} />
      </div>
    </Router>
  );
}
