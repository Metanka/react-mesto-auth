import React from 'react';

function PopupWithForm({name, title, children, isOpen, onClose, onSubmit}) {
  return (
    <>
      <div className={isOpen ? `popup popup_${name}` : `popup popup_${name} popup_hidden`}>
        <button onClick={onClose} className={`btn-close btn-close_${name}`}></button>
        <form onSubmit={onSubmit} className={`popup__container popup__container_${name}`} >
          <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__btn popup__btn_${name}`}
          >
            Сохранить
      </button>
        </form>
      </div>
    </>
  );
}

export default PopupWithForm;