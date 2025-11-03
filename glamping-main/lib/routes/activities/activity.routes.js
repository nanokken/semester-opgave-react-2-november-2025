import express from 'express';
import multer from 'multer';
import { activityStorage } from '../../db/mcd/misc/mStorage.js';
import { addActivity, deleteActivity, getActivity, updateActivity } from '../../handlers/activity.handler.js';
import auth from '../../middleware/auth.middleware.js';

const activityRoute = express.Router();
const upload = multer({ storage: activityStorage });

// Get
activityRoute.get('/activity/:id', async (req, res) => {

    let result = {status: 'error', message: `An Error Getting Activity occured`, data: []};
    if(req.params.id) {
        result = await getActivity(req.params.id);
    }
   
    return res.status(200).send({ ...result });
    
});


// POST / CREATE
activityRoute.post('/activity', auth, upload.single('file'), async (req, res) => {
    
    const { title, description, date, time } = req.body;
    
    const model = {
        title, 
        description, 
        date, 
        time
    }

    console.log('Model', model);

    if(req.file) {
        model.image = process.env.SERVER_HOST + '/activities/' + req.file.filename
    }

    const result = await addActivity(model);

    return res.status(200).send({ ...result});
    
});


// POST / CREATE
activityRoute.put('/activity', auth, upload.single('file'), async (req, res) => {

    const model = {
        ...req.body
    }

    if(req.file) {
        model.image = process.env.SERVER_HOST + '/activities/' + req.file.filename
    }

    const result = await updateActivity(model);

    return res.status(200).send({ ...result});
    
});

// DELETE -> ID
activityRoute.delete('/activity/:id', auth, async (req, res) => {

    if(!req.params.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }

    let result = await deleteActivity(req.params.id);

    return res.status(200).send({ ...result });

})

export default activityRoute;