import { useState } from "react";
import { Link } from "react-router-dom"

export function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();

    console.log(password, email);
    onRegister({ password, email }).then(() => {
      setEmail('');
      setPassword('');
    })
  }

  return (
    <section className="register" aria-label="Регистрация">
      <h2 className="register__heading">Регистрация</h2>
      <form
        className="register__form"
        name="register-form"
        onSubmit={handleSubmit}
        noValidate>
        <input
          className="register__input register__input_type_email"
          type="email"
          placeholder="Email"
          name="email"
          required
          minLength="2"
          maxLength="40"
          value={email || ''}
          onChange={handleEmailChange} />
        <input
          className="register__input register__input_type_password"
          type="password"
          placeholder="Пароль"
          name="password"
          required
          minLength="2"
          maxLength="200"
          value={password || ''}
          onChange={handlePasswordChange} />
        <button
          onSubmit={handleSubmit}
          type="submit"
          className="register__submit-button">Зарегистрироваться</button>
        <Link to="/sign-in" className="register__span">Уже зарегистрированы? Войти</Link>
      </form>
    </section>
  )
}