import React from 'react';

function Tooltip({isOpen, onClose}) {
  return (
    <>
      <div className={isOpen ? 'popup popup_tooltip' : 'popup popup_tooltip popup_hidden'} >
        <button onClick={onClose} className='btn-close btn-close_tooltip'></button>
        <div className='popup__container popup__container_tooltip' >
          <div className='tooltip tooltip_ok' ></div>
          <h2 className='popup__tooltip-title'>Вы успешно зарегистрировались!</h2>
        </div>
      </div>
    </>
  );
}

export default Tooltip;
