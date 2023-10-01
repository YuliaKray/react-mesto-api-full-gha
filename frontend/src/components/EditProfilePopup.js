import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
    onSubmit = {handleSubmit}
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    name = {'edit'}
    title = {`Редактировать профиль`}
    button = {`Сохранить`}>
      <input 
      className="popup__form-text popup__form-text_type_name" 
      type="text" 
      placeholder="Имя" 
      name="name" 
      required 
      minLength="2" 
      maxLength="40" 
      value={name || ''} 
      onChange={handleNameChange}/>
      <span 
      id="error-name" 
      className="popup__error-message"></span>
      <input 
      className="popup__form-text popup__form-text_type_description" 
      type="text" 
      placeholder="О себе" 
      name="about" 
      required 
      minLength="2" 
      maxLength="200" 
      value={description || ''} 
      onChange={handleDescriptionChange}/>
      <span 
      id="error-about" 
      className="popup__error-message"></span>
  </PopupWithForm>
  )
}