import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, onProfileSubmit}) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const {currentUser} = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onProfileSubmit(name, description);
  }

  return (
    <>
      <div className={isOpen ? `popup popup_profile` : `popup popup_profile popup_hidden`}>
        <button onClick={onClose} className={`btn-close btn-close_profile`}></button>
        <form onSubmit={handleProfileSubmit} className={`popup__container popup__container_profile`} >
          <h2 className={`popup__title popup__title_profile`}>Редактировать профиль</h2>
          <div className="input_box">
            <input
              id="profile-first"
              name="name"
              type="text"
              placeholder="Имя"
              required
              value={name || ''}
              className="popup__input popup__input_type-name"
              pattern="[A-Za-zА-ЯЁа-яё\-\s]{2,40}"
              onChange={handleNameChange}
            />
            <span
              className="popup__input_text_error"
              id="profile-first-error"
            ></span>
          </div>
          <div className="input_box">
            <input
              id="profile-second"
              name="info"
              type="text"
              placeholder="Род деятельности"
              required
              value={description || ''}
              className="popup__input popup__input_type-job"
              pattern="[A-Za-zА-ЯЁа-яё\-\s]{2,200}"
              onChange={handleDescriptionChange}
            />
            <span
              className="popup__input_text_error"
              id="profile-second-error"
            ></span>
          </div>
          <button
            type="submit"
            className={`popup__btn popup__btn_profile`}
          >
            Сохранить
      </button>
        </form>
      </div>
    </>
  );
}
export default React.memo(EditProfilePopup);