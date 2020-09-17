import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {


  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__box">
        <p className="header__email">{props.email}</p>
        <Link to={props.name === "Войти" ? 'sign-in' : 'sign-up'} className="header__login">{props.name}</Link>
      </div>
    </header>
  );
}

export default Header;
