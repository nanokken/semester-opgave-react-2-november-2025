import express from 'express'
import { getActivities } from '../../handlers/activities.handler.js';


const activitiesRoute = express.Router();

// Get
activitiesRoute.get('/activities', async (req, res) => {

    let result = await getActivities();
    return res.status(200).send({ ...result });
    
});


export default activitiesRoute;