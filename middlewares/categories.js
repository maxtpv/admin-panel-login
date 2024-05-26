const categories = require('../models/category');

const findAllCategories = async (req, res, next) => {
    console.log('GET /categories');
    try {
        const categoriesArray = await categories.find({});
        
        //массив для уникальных имен категорий
        const uniqueNames = [];
        //Оставляем только уникальные имена
        const uniqueCategories = categoriesArray.filter(category => {
            // Если имя категории уже есть в массиве, значит оно не уникально - не добавляем в массив уникальных имён
            if (uniqueNames.includes(category.name)) {
                return false;
            }
            // Если имя категории нет в массиве, значит оно уникально - добавляем в массив уникальных имён
            uniqueNames.push(category.name);
            return true;
        });

        req.categoriesArray = uniqueCategories;
        next();
    } catch (err) {
        res.status(500).send({ message: "Ошибка при получении списка категорий" });
    }
};

const findCategoryById = async (req, res, next) => {
    console.log("GET /categories/:id");
    try {
        req.category = await categories.findById(req.params.id);
        next();
    }
    catch (err) {
        res.status(404).send({ message: "Category not found" })
    }
}

const createCategory = async (req, res, next) => {
    console.log("POST /categories");
    try {
        req.game = await categories.create(req.body);
        next();
    }
    catch (err) {
        res.status(400).send({ message: "Error creating category" })
    }
}

const updateCategory = async (req, res, next) => {
    console.log("PUT /categories/:id");
    try {
        req.category = await categories.findByIdAndUpdate(req.params.id, req.body)
        next()
    }

    catch (err) {
        res.status(404).send({ message: "Error with update category" })
    }
}




const checkIsCategoryExists = async (req, res, next) => {
    const isInArray = req.categoriesArray.find((category) => {
        return req.body.name === category.name;
    });

    console.log(isInArray);

    if (isInArray) {
        res.status(400).send({ message: "Категория с таким названием уже существует" });
    } else {
        next();
    }
};

const checkIsCategoryExistsForUpdate = async (req, res, next) => {
    const categoryName = req.body.name;
    const categoryId = req.params.id;

    try {
        const existingCategory = await categories.findOne({ name: categoryName });

        if (existingCategory && existingCategory._id.toString() !== categoryId) {
            res.status(400).send({ message: "Категория с таким названием уже существует" });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).send({ message: "Ошибка проверки категории" });
    }
};


const checkEmptyName = async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Введите название категории" });
    } else {
        next();
    }
};


const deleteCategory = async (req, res, next) => {
    console.log("DELETE /categories/:id");
    try {
        req.category = await categories.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).send({ message: "Error deleting category" });
    }
};


module.exports = {checkIsCategoryExistsForUpdate, checkIsCategoryExists, findAllCategories, findCategoryById, createCategory, updateCategory, checkEmptyName, deleteCategory }
