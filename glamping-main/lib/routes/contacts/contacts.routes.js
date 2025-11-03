import express from 'express'
import { getActivities } from '../../handlers/activities.handler.js';
import { getContacts } from '../../handlers/contacts.handler.js';


const contactsRoute = express.Router();

// Get
contactsRoute.get('/contacts', async (req, res) => {

    let result = await getContacts();
    return res.status(200).send({ ...result });
    
});


export default contactsRoute;