const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const { HTTP_STATUS_NOT_FOUND } = require('http2').constants; // 404
const auth = require('../middlewares/auth');
const regEx = require('../utils/constants');

const {
  getUsers,
  getUserById,
  createUser,
  login,
  getMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const celebrateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regEx),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }),
    password: Joi.string().required(),
  }).unknown(true),
});

// Создание пользователя
userRouter.post('/signup', celebrateValidator, createUser);

// Авторизация пользователя
userRouter.post('/signin', celebrateValidator, login);

// Запрос вернуть всех пользователей
userRouter.get('/users', auth, getUsers);

// Запрос вернуть информацию о пользователе
userRouter.get('/users/me', auth, getMe);

// Запрос вернуть пользователя по Id
userRouter.get(
  '/users/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  getUserById,
);

// обновление информации профиля
userRouter.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);

// обновление аватара
userRouter.patch(
  '/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regEx),
    }),
  }),
  updateAvatar,
);

// несуществующий путь
userRouter.patch('*', (req, res) => {
  return res.setHeader('content-type', 'application/json').status(HTTP_STATUS_NOT_FOUND).send({ message: 'Not found' });
});

module.exports = userRouter;
