const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    getProducts,
    getProductById,
    createProduct
};


async function getProducts() {
    return Product.find().select('-hash');
}

async function createProduct(userParam) {
    const product = new Product({
        img: userParam.img,
        text: userParam.text,
        title: userParam.title
    });

    await product.save();
}

async function getProductById(id) {
    return await Product.findById(id).select('-hash');
}