import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './Header';

function Login({onLoginSubmit, onLoginOut}) {
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const history = useHistory();

  const handleInputEmail = (e) => {
    setLoginEmail(e.target.value);
  }

  const handleInputPassword = (e) => {
    setLoginPassword(e.target.value);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(loginEmail, loginPassword);
    history.push('/');
  }

  return (
    <>
      <Header name="Регистрация"  />
      <div className="sign">
        <h1 className="sign__title">Вход</h1>
        <form onSubmit={handleLoginSubmit} className='sign__form'>
          <input onChange={handleInputEmail} className='sign__input' placeholder="Email" required id="username" name="username" type="text" />
          <input onChange={handleInputPassword} className='sign__input' placeholder="Пароль" required id="password" name="password" type="password" />
          <button className='sign__btn' type="submit">Войти</button>
        </form>
        <p className='sign__text'>Вы еще не зарегистрированы?
        <Link to="/sign-up" className='sign__link'> Регистрация</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
