const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
require('./src/db/mongoose');
const helmet = require("helmet");

const eventRouter = require('./src/routers/event');
const holidayRouter = require('./src/routers/holidays');

app.use(helmet());

app.use(express.static('client/src'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(eventRouter);
app.use(holidayRouter)

const port = process.env.PORT || 3000;              


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
