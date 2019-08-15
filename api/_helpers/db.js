const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test_job',
    { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Product: require('../models/product.model'),
    Review: require('../models/review.model').Review,
    ReviewItemList: require('../models/review.model').ReviewItemList,
};
