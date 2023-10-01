import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleCardNameChange(e) {
    setCardName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onAddPlace({
      place: cardName,
      link: link,
    });
  }

  return(
    <PopupWithForm
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    onSubmit = {handleSubmit}
    name = {`add`}
    title = {`Новое место`}
    button = {`Сохранить`}>
      <input 
      onChange={handleCardNameChange} 
      value={cardName || ''} 
      className="popup__form-text popup__form-text_type_place" 
      type="text" 
      placeholder="Название" 
      name="place" 
      required 
      minLength="2" 
      maxLength="30"/>
      <span 
      id="error-place" 
      className="popup__error-message"></span>
      <input 
      onChange={handleLinkChange} 
      value={link || ''} 
      className="popup__form-text popup__form-text_type_image-link" 
      type="url" 
      placeholder="Ссылка на картинку" 
      name="link" 
      required/>
      <span 
      id="error-link" 
      className="popup__error-message"></span>
  </PopupWithForm>
  )
}