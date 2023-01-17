import express from 'express';
import ReviewsHandler from './reviews.handler.js';

const router = express.Router();

router.route("/movie/:id").get(ReviewsHandler.getReviews);
router.route("/new").post(ReviewsHandler.postReview);
router.route("/:id")
.get(ReviewsHandler.getReview)
.put(ReviewsHandler.updateReview)
.delete(ReviewsHandler.deleteReview);

export default router;