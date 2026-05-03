const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.options('*', cors());