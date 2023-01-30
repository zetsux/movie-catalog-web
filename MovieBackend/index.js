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