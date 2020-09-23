import React from 'react';
import {useHistory} from 'react-router-dom';

function Tooltip({isRegister, onClose}) {
  const history = useHistory();

  const handleClose = () => {
    onClose();
    if (isRegister.success) {
      history.push('/sign-in');
    }
  }

  return (
    <>
      <div className={Object.keys(isRegister).length !== 0 ? 'popup popup_tooltip' : 'popup popup_tooltip popup_hidden'} >
        <div className="popup__wall">
          <button onClick={handleClose} className='btn-close btn-close_tooltip'></button>
          <div className='popup__container popup__container_tooltip' >
            <div className={isRegister.success ? 'tooltip tooltip_ok' : 'tooltip tooltip_error'} ></div>
            <h2 className='popup__tooltip-title'>{isRegister.success || isRegister.fail}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tooltip;
