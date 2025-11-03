import express from 'express';
import multer from 'multer';
import auth from '../../middleware/auth.middleware.js';
import { reviewStorage } from '../../db/mcd/misc/mStorage.js';
import { addContact } from '../../handlers/contact.handler.js';


const contactRoute = express.Router();
const upload = multer({ storage: reviewStorage });

// POST / CREATE
contactRoute.post('/contact', upload.single('file'), async (req, res) => {
    
    const { name, email, message, subject } = req.body;
    
    const model = {
        name, 
        email, 
        message, 
        subject
    }


    const result = await addContact(model);

    return res.status(200).send({ ...result});
    
});

export default contactRoute;