import React from 'react';

const EditAvatarPopup = ({isOpen, onClose, onAvatarSubmit}) => {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAvatarSubmit(avatarRef.current.value);
  }

  return (
    <>
      <div className={isOpen ? `popup popup_change-avatar` : `popup popup_change-avatar popup_hidden`}>
        <button onClick={onClose} className={`btn-close btn-close_change-avatar`}></button>
        <form className={`popup__container popup__container_change-avatar`} >
          <h2 className={`popup__title popup__title_change-avatar`}>Изменить аватар</h2>
          <>
            <div className="input_box">
              <input
                id="avatar-first"
                name="link"
                type="url"
                placeholder="Ссылка на аватар"
                required
                className="popup__input popup__input_type-avatar"
                pattern="(^http|^https).+"
                ref={avatarRef}
              />
              <span
                className="popup__input_text_error"
                id="avatar-first-error"
              ></span>
            </div>
          </>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`popup__btn popup__btn_action_avatar`}
          >
            Сохранить
      </button>
        </form>
      </div>
    </>
  );
}
export default React.memo(EditAvatarPopup);