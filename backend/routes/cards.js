const { celebrate, Joi } = require('celebrate');
const cardRouter = require('express').Router();
const regEx = require('../utils/constants');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const celebrateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regEx),
  }).unknown(true),
});

// Запрос вернуть все карточки
cardRouter.get('/cards', getCards);

// Создание карточки
cardRouter.post('/cards', celebrateValidator, createCard);

// Удалить карточку по ID
cardRouter.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCard,
);

// поставить лайк
cardRouter.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);

// Удалить лайк
cardRouter.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = cardRouter;
