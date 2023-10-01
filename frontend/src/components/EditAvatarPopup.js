import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current,
    });
  }

  function handleAvatarChange(e) {
    avatarRef.current = e.target.value
  }

  return(
    <PopupWithForm
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    onSubmit = {handleSubmit}
    name = {`avatar-edit`}
    title = {`Обновить аватар`}
    button = {`Сохранить`}>
      <input 
      ref={avatarRef} 
      onChange={handleAvatarChange} 
      className="popup__form-text popup__form-text_type_avatar-link" 
      type="url" 
      placeholder="Ссылка на картинку аватара" 
      name="avatar" 
      required />
      <span 
      id="error-avatar" 
      className="popup__error-message"></span>
  </PopupWithForm>

  )
}