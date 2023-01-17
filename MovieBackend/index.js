import app from './server.js';
import mongodb, { CURSOR_FLAGS } from "mongodb";

//DAO = Data Access Objects
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;
const mongoURI = process.env.database;

const port = 8000;

MongoClient.connect(
    mongoURI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    })
})

// CURL TESTS

// POST
// curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d "{\"movieId\": 12, \"user\": \"beau\", \"review\": \"good\"}"
// curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d "{\"movieId\": 12, \"user\": \"quincy\", \"review\": \"bad movie\"}"
// curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d "{\"movieId\": 13, \"user\": \"beau\", \"review\": \"awesome\"}"

// curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d "{\"movieId\": 76600, \"user\": \"Mark\", \"review\": \"Good movie\"}"
// curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d "{\"movieId\": 76600, \"user\": \"Robert\", \"review\": \"Not bad, but overall too boring\"}"
// curl -X POST http://localhost:8000/api/v1/reviews/new -H "Content-Type: application/json" -d "{\"movieId\": 76600, \"user\": \"Gary\", \"review\": \"The duration of the movie is just too long for me personally\"}"

// GET (1 Review)
// curl -X GET http://localhost:8000/api/v1/reviews/63c5925f4822ba33076efb03

// GET (All Reviews by Movie ID)
// curl -X GET http://localhost:8000/api/v1/reviews/movie/12

// PUT
// curl -X PUT http://localhost:8000/api/v1/reviews/63c5925f4822ba33076efb03 -H "Content-Type: application/json" -d "{\"user\": \"beau\", \"review\": \"horrible\"}"

// DELETE
// curl -X DELETE http://localhost:8000/api/v1/reviews/63c5925f4822ba33076efb03