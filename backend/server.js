const express = require('express');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// cookie parser
const cookieParser = require('cookie-parser');

// custom middleware logger
app.use(logger);

// middleware
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use('/api/github', require("./src/routes/user"));

// custom error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
