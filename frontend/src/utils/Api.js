class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers; 
    // this._authorization = config.headers.authorization; //token
  }

  // Метод для одновременной загрузки инфы о пользователе и карточек
  getApiInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //Метод загрузки информации о пользователе с сервера
  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    // .then(() => {console.log(localStorage)})
    .then(this._handleResponse)
  }

  //Метод загрузки карточек с сервера
  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(this._handleResponse)
  }

  //Редактирование профиля с запросом patch
  editProfile(userInfo) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
    .then(this._handleResponse)
  }

  //Обновление аватара пользователя
  setNewAvatar(info) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: info.avatar,
      })
    })
    .then(this._handleResponse)
  }

  //Добавление новой карточки
  generateCardElement(card) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: card.place,
        link: card.link
      })
    })
    .then(this._handleResponse)
  }

  //Удаление карточки
  deleteCardElement(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._handleResponse)
  }

  //Постановка лайка
  setLike(cardData) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardData._id}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._handleResponse)
  }

  //Удаление лайка
  deleteLike(cardData) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardData._id}/likes`, {
      method: 'DELETE',
      headers: {
        // authorization: this._authorization,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._handleResponse)
  }


  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }
}

// Api
export const api = new Api({
  // url: "https://mesto.nomoreparties.co/v1/cohort-68",
  url: "http://localhost:3000",
  // headers: {
  //   authorization: "46f36a85-551d-499f-bb88-7f282b6e36a1",

  // }
})