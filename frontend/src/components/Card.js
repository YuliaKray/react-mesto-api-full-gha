import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card(props) { 
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = props.card.owner._id === currentUser._id;
  const isOwn = props.card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const isLiked = props.card.likes.some(id => id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`card__like ${!isLiked ? '' : 'card__like_active' }`);
  // isLiked && 'card__like_active'}`);

  function handleLike() {
    props.onCardLike(props.card)
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card._id)
  }

  return(
    <article className="card" key={props.card._id}>
    {isOwn && <button className='card__delete' type="button" aria-label="Удалить" title="Удалить" onClick={handleCardDelete} />}
    <img className="card__image" alt={props.card.name} src={props.card.link} onClick={handleClick}/>
    <h2 className="card__text">{props.card.name}</h2>
    <div className="card__like-container">
      <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" title="Лайк" onClick={handleLike}></button>
      <span className="card__like-number">{props.card.likes.length}</span>
    </div>
  </article>
  )
}