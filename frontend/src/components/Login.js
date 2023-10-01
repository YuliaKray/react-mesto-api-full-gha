import { useState } from "react";

export function Login({ onLogin }) {
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

    if (!password || !email) {
      return;
    }

    onLogin(password, email);
  }


  return (
    <section className="login" aria-label="Вход в профиль">
        <h2 className="login__heading">Вход</h2>
        <form 
          onSubmit={handleSubmit} 
          className="login__form" 
          name="login-form" 
          noValidate>
          <input 
            value={email || ''} 
            onChange={handleEmailChange} 
            className="login__input login__input_type_email" 
            type="email" 
            placeholder="Email" 
            name="email" 
            required 
            minLength="2" 
            maxLength="40" />
          <input 
            value={password || ''} 
            onChange={handlePasswordChange} 
            className="login__input login__input_type_password" 
            type="password" 
            placeholder="Пароль" 
            name="password" 
            required 
            minLength="2" 
            maxLength="200" />
          <button 
            onSubmit={handleSubmit} 
            type="submit" 
            className="login__submit-button">Войти</button>
        </form>
    </section>
  )
}