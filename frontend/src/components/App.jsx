/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';
import PopupWithForm from '../components/PopupWithForm/PopupWithForm';
import ImagePopup from '../components/ImagePopup/ImagePopup';
import { useState, useEffect } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import { registration, authorization, getUserData } from '../utils/auth';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProtectedHome from './ProtectedHome/ProtectedHome';

function App() {
  const navigate = useNavigate();
  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isResultOpenPopup, setIsResultOpenPopup] = useState(false);
  //стейты контекста
  const [currentUser, setIsCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  //стейты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, SetIsdeleteCardId] = useState('');
  //стейты регистрации и логина
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const setOnCloseAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false);
    setIsResultOpenPopup(false);
  };

  const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
      setOnCloseAllPopups();
      document.removeEventListener('keydown', closePopupByEsc);
    }
  };

  const closeAllPopups = () => {
    setOnCloseAllPopups();
    document.removeEventListener('keydown', closePopupByEsc);
  };

  useEffect(() => {
    if (!localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((error) =>
          console.error(`Ошибка авторизации при повторном входе ${error}`)
        );
    } else {
      setLoggedIn(false);
    }
  }, []);

  function setEvantListener() {
    document.addEventListener('keydown', closePopupByEsc);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEvantListener();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEvantListener();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEvantListener();
  }

  function handleDeletePopupOpen(cardId) {
    SetIsdeleteCardId(cardId);
    setIsDeletePopupOpen(true);
    setEvantListener();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEvantListener();
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInfo(localStorage.jwt)
        .then((dataUser) => {
          setIsCurrentUser(dataUser);
        })
        .catch((error) =>
          console.error(`Ошибка при создании начальных данных ${error}`)
        );
      api
        .getCards(localStorage.jwt)
        .then((dataCard) => {
          setCards(dataCard);
        })
        .catch((error) =>
          console.error(`Ошибка при создании начальных данных ${error}`)
        );
    }
  }, [loggedIn]);

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser, localStorage.jwt)
      .then((res) => {
        setIsCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(`Ошибка при редактировании профиля ${error}`)
      );
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .setNewAvatar(dataUser, localStorage.jwt)
      .then((res) => {
        setIsCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(`Ошибка при редактировании аватара ${error}`)
      );
  }

  function handleAddPlaceSubmit(dataUser, reset) {
    api
      .addNewCard(dataUser, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(`Ошибка при добавлении карточки ${error}`)
      );
  }

  //
  function handleCardLike(card, isLiked) {
    (!isLiked
      ? api.addLike(card._id, localStorage.jwt)
      : api.deleteLike(card._id, localStorage.jwt)
    )
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  //

  function handleRegister(password, email) {
    registration(password, email)
      .then(() => {
        setIsResultOpenPopup(true);
        setIsSuccessful(true);
        window.scrollTo(0, 0);
        navigate('/sign-in');
      })
      .catch((error) => {
        setIsResultOpenPopup(true);
        setIsSuccessful(false);
        console.error(`Ошибка при регистрации ${error}`);
      });
  }
  //

  function handleLogin(password, email) {
    authorization(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserEmail(email);
        setLoggedIn(true);
        window.scrollTo(0, 0);
        navigate('/');
      })
      .catch((error) => {
        setIsResultOpenPopup(true);
        setIsSuccessful(false);
        console.error(`Ошибка при авторизации ${error}`);
      });
  }
  //

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page-container'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <ProtectedRoute
                    element={ProtectedHome}
                    name='main'
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onDelete={handleDeletePopupOpen}
                    onCardLike={handleCardLike}
                    cards={cards}
                    userEmail={userEmail}
                    loggedIn={loggedIn}
                  />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              path='/sign-up'
              element={
                <>
                  <Header name='signup' />
                  <Main name='signup' handleRegister={handleRegister} />
                </>
              }
            ></Route>
            <Route
              path='/sign-in'
              element={
                <>
                  <Header name='signin' />
                  <Main name='signin' handleLogin={handleLogin} />
                </>
              }
            ></Route>
            <Route path='*' element={<Navigate name='/' replace />}></Route>
          </Routes>

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />

          <PopupWithForm
            name='delete'
            title='Вы уверены?'
            titleButton='Да'
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopup}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isSuccessful={isSuccessful}
            isOpen={isResultOpenPopup}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
