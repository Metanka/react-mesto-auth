export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email, callback) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then(res => {
      if (res.ok) {
        callback({success: 'Вы успешно зарегистрировались!'});
        return res.json();
      } else {
        callback({fail: 'Что-то пошло не так! Попробуйте ещё раз.'});
        return Promise.reject((400 === res.status) ? `${res.status} некорректно заполнено одно из полей` : `Что-то пошло не так ${res.status}`);
      }
    })
}

export const auth = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject((400 === res.status) ? `${res.status} не передано одно из полей` : `Пользователь с email не найден ${res.status}`);
      }
    })
    .then(data => {
      localStorage.setItem('token', data.token);
    })
}

export const tokenCheck = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorisation': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
}
