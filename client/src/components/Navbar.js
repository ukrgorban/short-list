import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

export const Navbar = () =>{
  const history = useHistory();

  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logOut();
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">Сокращение ссылок</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}