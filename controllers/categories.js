//GET
const sendAllCategories = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.categoriesArray));
};

//POST
const sendCategoryCreated = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.category));
};

//PUT
const sendCategoryUpdated  = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end("Category updated");
};

const sendCategoryDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};


module.exports = { sendAllCategories, sendCategoryCreated, sendCategoryUpdated, sendCategoryDeleted };