import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Medlemmer from './pages/medlemmer';
import Nyheder from './pages/nyheder';
import Events from './pages/events';
import Traening from './pages/traening';
import Home from './pages/home';
import Registration from './pages/registration';
import Profil from './pages/profil';
import AdminPanel from './pages/adminPanel';

import AddNews from './pages/addNews';
import AddTraining from './pages/addTraining';
import AddEvent from './pages/addEvent';




ReactDOM.render(
      <Router>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/profil" element={<Profil/>}/>
          <Route path="/medlemmer" element={<Medlemmer/>}/>
          <Route path="/nyheder" element={<Nyheder/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/traening" element={<Traening/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/signup" element={<Registration/>}/>
          <Route path="/adminPanel" element={<AdminPanel/>}/>
          <Route path="/addNews" element={<AddNews/>}/>
          <Route path="/addTraining" element={<AddTraining/>}/>
          <Route path="/addEvent" element={<AddEvent/>}/>
        </Routes>
      </Router>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
