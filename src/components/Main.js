import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';


const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onTrashClick, onLikeClick, cards, email}) => {
  const {currentUser} = React.useContext(CurrentUserContext);
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
    setUserAvatar(currentUser.avatar);
  }, [currentUser]);

  return (
    <>
      <Header name="Выйти" email={email} />
      <section className="profile">
        <div className="profile__box"  onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            alt="анфас улыбающегося дедушки в красной шапке"
            src={userAvatar}
           
          />
          <div className="profile__edit"></div>
        </div>
        <div className="profile__info">
          <div className="profile__title-box">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="add-button add-button_place"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map(item =>
          <Card
            onTrashClick={onTrashClick}
            onLikeClick={onLikeClick}
            onCardClick={onCardClick}
            key={item._id}
            item={item}
          />)}
      </section>
    </>
  );
}
//за классовыми компонентами следит Реакт, за функциональными компонентами мы следим сами
//что бы при изменении пропсов не перерендеривалось все дерево - компонент нужно положить
//в React.memo, тогда он обновляет только тогда, когда пропсы поменялись
export default React.memo(Main); 
