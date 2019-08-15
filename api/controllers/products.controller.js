const express = require('express');
const router = express.Router();
const productsService = require('../services/products.service');

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductsById);

module.exports = router;

function getProducts(req, res, next) {
    productsService.getProducts()
        .then(products => {
            res.json(products)
        })
        .catch(err => next(err));
}

function createProduct(req, res, next) {
    productsService.createProduct(req.body)
        .then((product) => res.json(product))
        .catch(err => next(err));
}

function getProductsById(req, res, next) {
    productsService.getProductById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}