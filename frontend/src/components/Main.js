import React from "react";
import { Card } from "./Card";
import editImage from "../images/Vector.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



export function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function getCards() {
    const cardsFromApi = props.cards.map((card) => (
      <Card key={card._id}
        card={card}
        onCardClick={props.onCardClick}
        onCardLike = {props.onCardLike}
        onCardDelete = {props.onCardDelete}
      ></Card>
    ));
    return cardsFromApi;
  }


  return (
    <main className="main">
      <section className="profile">
        <img 
          className="profile__image-edit" 
          alt="Редактирование аватарки" 
          src={editImage} />
        <img 
          className="profile__image" 
          alt="Фото профиля" 
          src={currentUser.avatar} 
          onClick={props.onEditAvatar} />
        <div className="profile__info">
          <div className="profile__title-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button 
              type="button" 
              className="profile__edit-button" 
              aria-label="кнопка редактирования" 
              title="Редактировать" 
              onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__caption">{currentUser.about}</p>
        </div>
        <button 
          type="button" 
          className="profile__add-button" 
          aria-label="кнопка добавления" 
          title="Добавить картинку" 
          onClick={props.onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Фотографии">{getCards()}
      </section>
    </main>
  )
}