const express = require('express');
const axios = require('axios');
require('dotenv').config()

const app = express();
const port = 3000
const cors = require('cors');


app.use(cors());
app.use(express.static('static'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
