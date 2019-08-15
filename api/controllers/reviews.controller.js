const express = require('express');
const router = express.Router();
const reviewsService = require('../services/reviews.service');

router.get('/:id', getReviewByUserId);
router.post('/:id', createReviewByUserId);

module.exports = router;

function getReviewByUserId(req, res, next) {
    reviewsService.getReviewByUserId(req.params.id)
        .then(user => {
            user ? res.json(user[0].reviews) : res.sendStatus(404)
        })
        .catch(err => next(err));
}

function createReviewByUserId(req, res, next) {
    reviewsService.createReviewByUserId(req.params.id, req.body, req.user)
        .then((review) => res.json(review))
        .catch(err => next(err));
}
