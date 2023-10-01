const { HTTP_STATUS_OK } = require('http2').constants; // 200
const { HTTP_STATUS_CREATED } = require('http2').constants; // 201
const NotFoundError = require('../errors/NotFoundError'); // 404
const ForbiddenError = require('../errors/ForbiddenError'); // 403

const card = require('../models/card');

const getCards = (req, res, next) => {
  return card.find({})
    .then((r) => {
      return res.status(HTTP_STATUS_OK).send(r);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const user = req.user._id;
  return card.create({ name, link, owner: user })
    .then((result) => {
      return res.status(HTTP_STATUS_CREATED).send(result);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const user = req.user._id;

  card.findById(req.params.cardId)
    .then((result) => {
      if (result === null || result === undefined) {
        throw new NotFoundError('Card not found');
      }
      if (result.owner.toString() !== user) {
        throw new ForbiddenError('Пользователь не создавал эту карточку');
      }

      return result.deleteOne()
        .then((result) => {
          return res.status(HTTP_STATUS_OK).send(result);
        });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const user = req.user._id;
  return card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: user } },
    { new: true },
  )
    .then((result) => {
      if (result === null || result === undefined) {
        throw new NotFoundError('Card not found');
      }
      return res.setHeader('content-type', 'application/json').status(HTTP_STATUS_CREATED || HTTP_STATUS_OK).send(result);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const user = req.user._id;
  return card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: user } },
    { new: true },
  )
    .then((result) => {
      if (result === null || result === undefined) {
        throw new NotFoundError('Card not found');
      }
      return res.setHeader('content-type', 'application/json').status(HTTP_STATUS_OK).send(result);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
