import express from 'express'
import { getStays } from '../../handlers/stays.handler.js';



const staysRoute = express.Router();

// Get
staysRoute.get('/stays', async (req, res) => {

    let result = await getStays();

    return res.status(200).send({ ...result });
    
});


export default staysRoute;