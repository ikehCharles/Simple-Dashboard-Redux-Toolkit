import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { RootState } from './app/store';
import UsersEntry from './components/users/usersEntry';
import UsersGrid from './components/users/usersGrid';
import { useHeaderTitle } from './context/headerTitle.ctx';

function App() {
  const {title} = useHeaderTitle()

 
  return (

    <div className="App">
      <h2 style={{margin: "20px"}}>
        <Link style={{color:'#000000', textDecoration: "none"}} to="/">
        {title}
        </Link>
        </h2>
      <Routes>
        <Route path="/" element={ <UsersGrid  /> } />
        <Route path="entry" element={ <UsersEntry   /> } />
      </Routes>
      
    </div>
  );
}

export default App;
