const categoriesRouter = require('express').Router();
const {findAllCategories, createCategory, updateCategory, checkEmptyName, deleteCategory, checkIsCategoryExists, checkIsCategoryExistsForUpdate} = require('../middlewares/categories');
const {sendAllCategories, sendCategoryCreated, sendCategoryUpdated, sendCategoryDeleted} = require('../controllers/categories');
const { checkAuth } = require("../middlewares/auth.js");

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.post('/categories', findAllCategories, checkAuth, checkEmptyName, checkIsCategoryExists, createCategory, sendCategoryCreated)
categoriesRouter.put('/categories/:id', checkEmptyName, checkIsCategoryExistsForUpdate, checkAuth, updateCategory, sendCategoryUpdated)
categoriesRouter.delete("/categories/:id", checkAuth, deleteCategory, sendCategoryDeleted);


module.exports = categoriesRouter;