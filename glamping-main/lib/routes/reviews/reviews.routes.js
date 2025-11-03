import express from 'express'
import { getReviews } from '../../handlers/reviews.handler.js';



const reviwesRoute = express.Router();

// Get
reviwesRoute.get('/reviews', async (req, res) => {

    let result = await getReviews();

    return res.status(200).send({ ...result });
    
});


export default reviwesRoute;