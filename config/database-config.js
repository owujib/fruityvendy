const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve('.env') });

module.exports = async () => mongoose.connect(process.env.DATABASE_URL);
