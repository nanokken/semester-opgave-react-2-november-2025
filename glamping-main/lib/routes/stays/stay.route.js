import express from 'express';
import multer from 'multer';
import auth from '../../middleware/auth.middleware.js';
import { stayStorage } from '../../db/mcd/misc/mStorage.js';
import { addStay, deleteStay, getStayById, updateStay } from '../../handlers/stay.handler.js';

const stayRoute = express.Router();
const upload = multer({ storage: stayStorage });


// Get
stayRoute.get('/stay/:id', async (req, res) => {

    let result = await getStayById(req.params.id);
    return res.status(200).send({ ...result });
    
});

stayRoute.get('/stay', async (req, res) => {

    console.log('TEST', req.query.id)

    let result = await getStayById(req.query.id);
    return res.status(200).send({ ...result });
    
});


// POST / CREATE
stayRoute.post('/stay', upload.single('file'), async (req, res) => {
    
    const { title, description, numberOfPersons, price, includes } = req.body;
    
    const model = {
        title, 
        description, 
        numberOfPersons, 
        price, 
        includes
    }

    if(req.file) {
        model.image = process.env.SERVER_HOST + '/stays/' + req.file.filename
    }

    const result = await addStay(model);

    return res.status(200).send({ ...result});
    
});

// PUT / UPDATE
stayRoute.put('/stay', upload.single('file'), async (req, res) => {
    
    const model = {
        ...req.body
    }

    if(req.file) {
        model.image = process.env.SERVER_HOST + '/stays/' + req.file.filename
    }

    const result = await updateStay(model);

    return res.status(200).send({ ...result});
    
});

// DELETE -> ID
stayRoute.delete('/stay/:id', auth, async (req, res) => {

    if(!req.params.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }

    let result = await deleteStay(req.params.id);

    return res.status(200).send({ ...result });

})


export default stayRoute;