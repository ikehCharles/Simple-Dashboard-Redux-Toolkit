import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { RootState } from './app/store';
import UsersEntry from './components/users/usersEntry';
import UsersGrid from './components/users/usersGrid';

function App() {
  const users = useSelector((state: RootState) => state.users);

  return (
    <div className="App">
      {(users.status === "error" || users.status==="success") && <h1>{users.message}({users.status})</h1>}
      <h2 style={{margin: "20px"}}>
        <Link style={{color:'#000000', textDecoration: "none"}} to="/">
        Dashboard
        </Link>
        </h2>
      <Routes>
        <Route path="/" element={ <UsersGrid  /> } />
        <Route path="entry" element={ <UsersEntry users={users} /> } />
      </Routes>
      
    </div>
  );
}

export default App;
