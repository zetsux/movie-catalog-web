import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsHandler {
    static async postReview(req, res, next) {
        try {
            const movieId = parseInt(req.body.movieId);
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
            res.json({status: 'success'});
        } catch (err) {
            res.status(500).json({error : err.message});
        }
    }

    static async getReview(req, res, next) {
        try {
            let id = req.params.id || {}; //kalo ada pake id, klo gada pake empty object
            let review = await ReviewsDAO.getReview(id);

            if (!review) {
                res.status(404).json({error: "Not Found"});
                return;
            }
            res.json(review);
        } catch (err) {
            console.log(`api, ${err}`);
            res.status(500).json({error: err.message});
        }
    }

    static async updateReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);

            let { error } = reviewResponse;
            if (error) {
                res.status(400).json({error});
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error (
                    "Unable to Update Review"
                );
            }

            res.json({status: 'success'});
        } catch (err) {
            res.status(500).json({error : err.message});
        }
    }

    static async deleteReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.delReview(reviewId);
            res.json({status: 'success'});
        } catch (err) {
            res.status(500).json({error : err.message});
        }
    }

    static async getReviews(req, res, next) {
        try {
            let id = req.params.id || {};
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);

            if (!reviews) {
                res.status(404).json({error: "Not Found"});
                return;
            }

            res.json(reviews);
        } catch (err) {
            console.log(`api, ${err}`);
            res.status(500).json({error : err.message});
        }
    }
}