import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './Header';
import Tooltip from './InfoTooltip';


function Registration({onInputEmail, onInputPassword, onRegistrationSubmit}) {
  const history = useHistory()
  const [isOpenTooltip, setIsOpenTooltip] = React.useState(false);

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    onRegistrationSubmit();
    setIsOpenTooltip(true);
    history.push('/sign-in');
  }

  const handleInputEmail = (e) => {
    onInputEmail(e.target.value);
  }

  const handleInputPassword = (e) => {
    onInputPassword(e.target.value);
  }

  const handleCloseTooltip = () => {
    setIsOpenTooltip(false);
  }

  return (
    <>
      <Header name='Войти' />
      <div className="sign">
        <h1 className="sign__title">Регистрация</h1>
        <form className='sign__form' onSubmit={handleRegistrationSubmit}>
          <input onChange={handleInputEmail} className='sign__input' placeholder="Email" required id="username" name="username" type="text" />
          <input onChange={handleInputPassword} className='sign__input' placeholder="Пароль" required id="password" name="password" type="password" />
          <button className='sign__btn' type="submit">Зарегистрироваться</button>
        </form>
        <p className='sign__text'>Уже зарегистрированы?
      <Link to="" className='sign__link'> Войти</Link>
        </p>
      </div>
      <Tooltip isOpen={isOpenTooltip} onClose={handleCloseTooltip} />
    </>
  );
}

export default Registration;
