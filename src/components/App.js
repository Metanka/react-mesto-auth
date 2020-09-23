import React from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from '../contexts/CardsContext';
import Login from './Login';
import Registration from './Registration';
import ProtectedRoute from './ProtectedRoute';
import {register, auth, getToken} from '../utils/auth';


const App = () => {
  // переменные состояния открытия
  const [isOpenAvatar, setIsOpenAvatar] = React.useState(false);
  const [isOpenProfile, setIsOpenProfile] = React.useState(false);
  const [isOpenPlace, setIsOpenPlace] = React.useState(false);
  const [isOpenImage, setIsOpenImage] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [dataCards, setDataCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isRegister, setIsRegister] = React.useState({});

  React.useEffect(() => {
    //ответ 2х запросов api (информация о профиле и массив карточек)
    api.getInfoUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err));

    api.getCardsInfo()
      .then((data) => {
        setDataCards(data);
      })
      .catch(err => console.log(err));

    return () => {};
  }, []);

  React.useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsOpenAvatar(true);
  };
  function handleEditProfileClick() {
    setIsOpenProfile(true);
  };
  function handleAddPlaceClick() {
    setIsOpenPlace(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpenImage(true);
  };
  // закрытивыет все попапы
  const closeAllPopups = () => {
    setIsOpenAvatar(false);
    setIsOpenPlace(false);
    setIsOpenProfile(false);
    setIsOpenImage(false);
  }

  const handleProfileChange = (name, description) => {
    api.editProfileInfo(name, description).then(data => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(err => console.log(err));
  }

  const handleAvatarChange = (value) => {
    api.changeAvatar(value).then(data => {
      setCurrentUser(data);
      closeAllPopups()
    }).catch(err => console.log(err));
  }

  // функции, относящиеся к карточкам 
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id, !isLiked).then((newCard) => {
        const newCards = dataCards.map((c) => c._id === card._id ? newCard : c);
        setDataCards(newCards);
      }).catch(err => console.log(err));
    } else {
      api.addLike(card._id, !isLiked).then((newCard) => {
        const newCards = dataCards.map((c) => c._id === card._id ? newCard : c);
        setDataCards(newCards);
      }).catch(err => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((cardDelete) => {
      const newCards = dataCards.filter((c) => c._id !== card._id);
      setDataCards(newCards);
    }
    ).catch(err => console.log(err));
  }

  const handlePlaceSubmit = (name, link) => {
    api.addNewCard(name, link).then(newCard => {
      setDataCards([...dataCards, newCard]);;
      closeAllPopups();
    }).catch(err => console.log(err));
  }

  const handleRegistrationSubmit = () => {
    register(password, email, setIsRegister)
      .then((res) => {
        setLoggedIn(true);
      })
      .catch(err => console.log(err))
  }

  const handleEmailChange = (value) => {
    setEmail(value);
  }

  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      getToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
        } 
      })
        .catch(err => console.log(err))
    }
  }

  const handleLoginSubmit = (loginEmail, loginPassword) => {
    auth(loginEmail, loginPassword)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
    tokenCheck();
  }

  const handleCloseTooltip = () => {
    setIsRegister([]);
  }

  const handleLoginOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <CardsContext.Provider value={{dataCards, setDataCards}}>
          <BrowserRouter>
            <Switch>
              <Route path="/sign-up">
                <Registration
                  onInputEmail={handleEmailChange}
                  onInputPassword={handlePasswordChange}
                  onRegistrationSubmit={handleRegistrationSubmit}
                  isRegister={isRegister}
                  onClose={handleCloseTooltip} />
              </Route>
              <Route path="/sign-in">
                <Login
                  onLoginSubmit={handleLoginSubmit}
                />
              </Route>
              <ProtectedRoute exact path="/cards" loggedIn={loggedIn} component={Main}
                cards={dataCards}
                email={email}
                onTrashClick={handleCardDelete}
                onLikeClick={handleCardLike}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                setLoginIn={setLoggedIn}
                onLoginOut={handleLoginOut}
              />
              <Route path="/">
                <Redirect to={loggedIn ? '/cards' : '/sign-in'} />
              </Route>
            </Switch>
            <Footer />
            <EditProfilePopup isOpen={isOpenProfile} onClose={closeAllPopups} onProfileSubmit={handleProfileChange} />
            <EditAvatarPopup isOpen={isOpenAvatar} onClose={closeAllPopups} onAvatarSubmit={handleAvatarChange} />
            <AddPlacePopup
              isOpen={isOpenPlace}
              onClose={closeAllPopups}
              onPlaceSubmit={handlePlaceSubmit}
            />
            <ImagePopup selectedCard={selectedCard} isOpen={isOpenImage} onClose={closeAllPopups} />
          </BrowserRouter>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default React.memo(App);
