import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = ({item, onCardClick, onLikeClick, onTrashClick}) => {
  const {link, likes, name} = item;
  
  const {currentUser} = React.useContext(CurrentUserContext);
  const count = likes.length;
  function handleClick() {
    onCardClick({link: link, text: name});
  }
  function handleLikeClick() {
    onLikeClick(item);
  }
  function handleTrashClick() {
    onTrashClick(item);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = item.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? '' : 'element__trash_hidden'}`
  );
  // // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === currentUser._id);
  
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked ? 'element__icon element__icon_active' : 'element__icon'}`
  );

  return (
    <div id="card">
      <div className="element">
        <button onClick={handleTrashClick} className={cardDeleteButtonClassName}></button>
        <img className="element__image" onClick={handleClick} src={link} alt={name} />
        <div className="element__info">
          <h2 className="element__title">{name}</h2>
          <div className="element__icon_box">
            <button onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
            <p className="element__counter">{count}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Card);