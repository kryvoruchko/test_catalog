const db = require('_helpers/db');
const authService = require('./auth.service');
const Review = db.Review;
const ReviewItemList = db.ReviewItemList;

module.exports = {
    getReviewByUserId,
    createReviewByUserId
};

async function getReviewByUserId(id) {
    return await ReviewItemList.find({product_id: id});
}

async function createReviewByUserId(id, userParam, userId) {
    const user = await authService.getById(userId.sub);
    const it = await getReviewByUserId(id);
    const newReviewItem = new Review({
        created_by: {
            id: user.id,
            username: user.username
        },
        product: id,
        text: userParam.text,
        rate: userParam.rate
    });

    if (!it || it.length === 0) {
        const newReview = new ReviewItemList({
            product_id: id,
            reviews: [newReviewItem]
        });

        await newReview.save();
    } else {
        const dataUpdate = it[0].reviews;
        dataUpdate.push(newReviewItem);
        return await ReviewItemList.findByIdAndUpdate(
            { _id: it[0]._id },
            { reviews: dataUpdate },
            { returnOriginal: true, useFindAndModify: false },
            (err, res) => {
                if (err) {
                    return err;
                }
                return res;
            });
    }
}