import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';

function Login() {
  return (
    <>
      <Header name="Авторизация" />
      <div className="sign">
        <h1 className="sign__title">Вход</h1>
        <form className='sign__form'>
          <input className='sign__input' placeholder="Email" required id="username" name="username" type="text" />
          <input className='sign__input' placeholder="Пароль" required id="password" name="password" type="password" />
          <button className='sign__btn' type="submit">Войти</button>
        </form>
        <p className='sign__text'>Вы еще не зарегистрированы?
        <Link to="" className='sign__link'> Регистрация</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
