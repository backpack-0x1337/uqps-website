const express = require('express');
const serverless = require('serverless-http');
require('dotenv').config()

const app = express();
const port = 3000
const cors = require('cors');


app.use(cors());
app.use(express.static('static'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports.handler = serverless(app);
