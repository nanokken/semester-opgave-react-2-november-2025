import express from 'express';
import multer from 'multer';
import auth from '../../middleware/auth.middleware.js';
import { reviewStorage } from '../../db/mcd/misc/mStorage.js';
import { addReview, deleteReview, updateReview } from '../../handlers/review.handler.js';

const reviewRoute = express.Router();
const upload = multer({ storage: reviewStorage });

// POST / CREATE
reviewRoute.post('/review', upload.single('file'), async (req, res) => {
    
    const { name, review, stay, age } = req.body;
    
    const model = {
        name,
        review,
        stay,
        age
    }

    if(req.file) {
        model.image = process.env.SERVER_HOST + '/reviews/' + req.file.filename
    }

    const result = await addReview(model);

    return res.status(200).send({ ...result});
    
});

// PUT / UPDATE
reviewRoute.put('/review', upload.single('file'), async (req, res) => {
    
    const model = {
        ...req.body
    }

    if(req.file) {
        model.image = process.env.SERVER_HOST + '/reviews/' + req.file.filename
    }

    const result = await updateReview(model);

    return res.status(200).send({ ...result});
    
});

// DELETE -> ID
reviewRoute.delete('/review/:id', auth, async (req, res) => {

    if(!req.params.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }

    let result = await deleteReview(req.params.id);

    return res.status(200).send({ ...result });

})

export default reviewRoute;