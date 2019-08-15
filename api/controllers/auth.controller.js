const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

router.post('/signIn', login);
router.post('/signUp', register);
router.get('/:id', getById);

module.exports = router;

function login(req, res, next) {
    authService.login(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    authService.createUser(req.body)
        .then((token) => res.json(token))
        .catch(err => next(err));
}

function getById(req, res, next) {
    authService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}