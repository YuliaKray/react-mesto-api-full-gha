export function ImagePopup(props) {
  return (
    <section 
      className={`popup popup_type_image ${props.card.link ? 'popup_opened' : ''}`} 
      aria-label="Картинка">
      <figure className="popup__figure">
        <button 
          type="button" 
          className="popup__close" 
          aria-label="Кнопка закрытия" 
          onClick={props.onClose}></button>
        <img 
          className="popup__image" 
          alt={props.card.name} 
          src={props.card.link}/>
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure> 
    </section>
  )
}