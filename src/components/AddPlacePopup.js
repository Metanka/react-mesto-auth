import React from 'react';

function AddPlacePopup({isOpen, onClose, onSubmit, onPlaceSubmit}) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceSubmit(place, link);
  }

  return (
    <>
      <div className={isOpen ? `popup popup_add-img` : `popup popup_add-img popup_hidden`}>
        <button onClick={onClose} className={`btn-close btn-close_add-img`}></button>
        <form onSubmit={onSubmit} className={`popup__container popup__container_add-img`} >
          <h2 className={`popup__title popup__title_add-img`}>Добавить место</h2>
          <div className="input_box">
            <input
              id="add-img-first"
              name="name"
              type="text"
              placeholder="Название"
              required
              className="popup__input popup__input_type-place"
              pattern="[A-Za-zА-ЯЁа-яё\-\s]{1,30}"
              onChange={handlePlaceChange}
            />
            <span
              className="popup__input_text_error"
              id="add-img-first-error"
            ></span>
          </div>
          <div className="input_box">
            <input
              id="add-img-second"
              name="link"
              type="url"
              placeholder="Ссылка на картинку"
              required
              className="popup__input popup__input_type-img"
              pattern="(^http|^https).+"
              onChange={handleLinkChange}
            />
            <span
              className="popup__input_text_error"
              id="add-img-second-error"
            ></span>
          </div>
          <button
            type="submit"
            className={`popup__btn popup__btn_add-place`}
            onClick={handleSubmit}
          >
            Добавить
      </button>
        </form>
      </div>
    </>
  );
}

export default React.memo(AddPlacePopup);