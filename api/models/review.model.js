const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: String, unique: true },
    product: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    created_by: {
        id: { type: String, required: true },
        username: { type: String, required: true }
    },
    rate: { type: Number, required: true },
    text: { type: String, required: true }
});

const schemaList = new Schema({
    product_id: { type: String, unique: true },
    reviews: { type: Array }
});

schema.set('toJSON', { virtuals: true });
schemaList.set('toJSON', { virtuals: true });

module.exports.Review = mongoose.model('Review', schema);
module.exports.ReviewItemList = mongoose.model('ReviewItemList', schemaList);