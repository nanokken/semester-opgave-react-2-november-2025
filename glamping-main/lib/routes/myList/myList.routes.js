import express from 'express';
import multer from 'multer';
import auth from '../../middleware/auth.middleware.js';
import { reviewStorage } from '../../db/mcd/misc/mStorage.js';
import { saveList } from '../../handlers/myList.handler.js';

const myListRoute = express.Router();
const upload = multer({ storage: reviewStorage });

// POST / CREATE
myListRoute.post('/mylist/save', upload.single('file'), async (req, res) => {
    
    const { activityIds, email } = req.body;
    
    const model = {
        activityIds, 
        email
    }


    const result = await saveList(model);

    return res.status(200).send({ ...result});
    
});

export default myListRoute;