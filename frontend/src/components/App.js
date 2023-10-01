import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoTooltip } from "./InfoTooltip";
import { ProtectedRouteElement} from "./ProtectedRoute";
import * as Auth from '../utils/Auth.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('')
  const navigate = useNavigate();
  const [isResGood, setIsResGood] = React.useState(false);


  React.useEffect(() => {
    checkToken();
    api.getApiInfo().then(([user, initialCards]) => {
      setCurrentUser(user);
      setCards(initialCards);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setIsInfoToolTipOpen(false);
  }

  function handleUpdateUser(userInfo) {
    api.editProfile(userInfo).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(info) {
    api.setNewAvatar(info).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCard) {
    api.generateCardElement(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    const isLiked = card.likes.some(id => id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(err);
      });
    } else {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.setLike(card, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    });
  }
  }

  function handleCardDelete(_id) {
    api.deleteCardElement(_id).then(() => {
      setCards((state) => state.filter((c) => c._id !== _id ));
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleRegister({ password, email }) {
    return Auth.register(password, email).then((res) => {
      navigate('/sign-in', {replace: true});
      setIsInfoToolTipOpen(true);
      setIsResGood(true);
    }).catch((err) => {
      setIsInfoToolTipOpen(true);
      setIsResGood(false);
      console.log(err)
    });
  }

  function handleLogin(password, email) {
    return Auth.login(password, email).then((data) => {
      if (data.token) {
      navigate('/', {replace: true});
      setLoggedIn(true);
      setUserEmail(email);
    };
      api.getApiInfo().then(([user, initialCards]) => {
        setCurrentUser(user);
        setCards(initialCards);
      }).catch((err) => {
        console.log(err);
      });

  }).catch((err) => console.log(err));
  }

  function checkToken() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      Auth.checkToken(jwt).then((res) => {
        if (res){
          // const userEmail = res.data.email;
          const userEmail = res.email;
          setUserEmail(userEmail);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
    }
  }

  function signOut(){
    localStorage.removeItem('token');
    setUserEmail('');
  }

  return (
  <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
    <Header email={userEmail} onSignOut={signOut} loggedIn={loggedIn} />
    <Routes>
      <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}/> 
      <Route path="/sign-up" element={<Register onRegister={handleRegister}/>} />
      <Route path="/sign-in" element={<Login onLogin={handleLogin}  loggedIn={loggedIn}/>} />
      <Route path="/" element={<ProtectedRouteElement component={Main}
       loggedIn={loggedIn}
       onEditAvatar = {handleEditAvatarClick}
       onEditProfile = {handleEditProfileClick}
       onAddPlace = {handleAddPlaceClick}
       onCardClick = {handleCardClick}
       cards = {cards}
       onCardLike = {handleCardLike}
       onCardDelete = {handleCardDelete}/>} />
    </Routes>
    <Footer/>
    <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}/>
    <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups} 
      onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup 
      isOpen={isAddPlacePopupOpen} 
      onClose={closeAllPopups} 
      onAddPlace={handleAddPlaceSubmit}/>
    <PopupWithForm
      name = {`delete`}
      title = {`Вы уверены?`}
      button = {`Да`}>
    </PopupWithForm>
    <ImagePopup
    card = {selectedCard}
    onClose = {closeAllPopups}>
    </ImagePopup>
    <InfoTooltip 
      isResGood={isResGood}
      isOpen={isInfoToolTipOpen}
      onClose = {closeAllPopups} 
      goodInfo={'Вы успешно зарегистрировались!'}
      errorInfo={'Что-то пошло не так! Поробуйте ещё раз.'}
    />
    </CurrentUserContext.Provider>
  </div>
  );
}

export default App;


