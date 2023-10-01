export function PopupWithForm(props) {
  return(
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} aria-label={`${props.title}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Кнопка закрытия"
          onClick={props.onClose}></button>
        <h2 className="popup__heading">{`${props.title}`}</h2>
        <form
          className="popup__form"
          name={`${props.name}-form`}
          onSubmit={props.onSubmit}
          noValidate>
          {props.children}
          <button
            type="submit"
            className="popup__submit-button">{props.button}</button>
        </form>
      </div>
    </section>
    )
} 
