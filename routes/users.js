const userRouter = require('express').Router();
const { findAllUsers, createUser, updateUser, checkEmptyNameEmailAndPassword, checkEmptyNameEmail, deleteUser, hashPassword } = require('../middlewares/users')
const { sendAllUsers, sendUserCreated, sendUserUpdated, sendUserDeleted, sendMe } = require('../controllers/users');
const { checkAuth } = require("../middlewares/auth.js");

userRouter.get('/users', findAllUsers, sendAllUsers);
userRouter.post('/users', findAllUsers, checkEmptyNameEmailAndPassword, hashPassword, checkAuth, createUser, sendUserCreated);
userRouter.put('/users/:id', checkEmptyNameEmail, checkAuth, updateUser, sendUserUpdated)
userRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);
userRouter.get("/me", checkAuth, sendMe);

module.exports = userRouter;