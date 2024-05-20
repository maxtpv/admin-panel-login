const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('./middlewares/cors');
const apiRouter = require('./routes/api');
const cookieParser = require("cookie-parser");
const pagesRouter = require("./routes/pages");

const connectToDatabase = require('./database/connect');


const app = express();
const PORT = process.env.PORT || 3001
connectToDatabase()


app.use(
    cors, 
    cookieParser(),
    bodyParser.json(),
    apiRouter,
    pagesRouter,
    express.static(path.join(__dirname, 'public')),
    );

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})