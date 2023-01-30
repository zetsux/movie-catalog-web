const ObjectID = require('mongodb').ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(client) {
        if (reviews) return;
        try {
            reviews = await client.db("reviewsDb").collection("reviewsCol");
        } catch (err) {
            console.error(`Unable to establish collection handles in userDAO: ${err}`);
        }
    }

    static async addReview(mId, user, review) {
        try {
            const reviewDoc = {
                movieId: mId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc);
        } catch (err) {
            console.error(`Unable to post review: ${err}`);
            return {error: err};
        }
    }

    static async getReview(rId) {
        try {
            return await reviews.findOne({_id: ObjectID(rId)});
        } catch (err) {
            console.error(`Unable to get review: ${err}`);
            return {error: err};
        }
    }

    static async updateReview(rId, user, review) {
        try {
            const updateResponse = await reviews.updateOne({_id: ObjectID(rId)}, {$set: {user: user, review: review}});
            return updateResponse;
        } catch (err) {
            console.error(`Unable to update review: ${err}`);
            return {error: err};
        }
    }

    static async delReview(rId) {
        try {
            const deleteResponse = await reviews.deleteOne({_id: ObjectID(rId)});
            return deleteResponse;
        } catch (err) {
            console.error(`Unable to delete review: ${err}`);
            return {error: err};
        }
    }

    static async getReviewsByMovieId(mId) {
        try {
            const cursor = await reviews.find({movieId: parseInt(mId)})
            return cursor.toArray();
        } catch (err) {
            console.error(`Unable to get reviews: ${err}`);
            return {error: err};
        }
    }
}