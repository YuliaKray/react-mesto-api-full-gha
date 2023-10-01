import iconGood from '../images/icon-good.svg'
import iconError from '../images/icon-error.svg'

export function InfoTooltip(props) {
  return(
    <section className={`popup popup_type_info-tip ${props.isOpen ? 'popup_opened' : ''}`} aria-label={`Регистрация прошла?`}>
      <div className="popup__container popup__container_info">
        <button type="button" className="popup__close" aria-label="Кнопка закрытия" onClick={props.onClose}></button>
        <img className="popup__icon" src={`${props.isResGood ? iconGood : iconError}`} alt="инфо иконка" />
        <h2 className="popup__info-heading">{props.isResGood ? props.goodInfo : props.errorInfo}</h2>
      </div>
    </section>
    )
}