const gamesRouter = require('express').Router();
const {
    findAllGames,
    checkIsGameExists,
    checkIfCategoriesAvaliable,
    findGameById,
    createGame,
    checkIfUsersAreSafe,
    updateGame,
    deleteGame,
    checkEmptyFields,
    sendGameById
  } = require("../middlewares/games.js");

const { sendAllGames, sendGameCreated, sendGameUpdated, sendGameDeleted} = require('../controllers/games');
const { checkAuth } = require("../middlewares/auth.js");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  createGame,
  sendGameCreated
);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  updateGame,
  sendGameUpdated
);
gamesRouter.delete('/games/:id', checkAuth, deleteGame, sendGameDeleted)

module.exports = gamesRouter;