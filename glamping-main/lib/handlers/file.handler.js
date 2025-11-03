import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

// Models
import userModel from "../db/models/user.model.mjs";
import reviewModel from '../db/models/review.model.mjs';
import stayModel from '../db/models/stay.model.mjs';
import activityModel from '../db/models/activity.model.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const deleteFile = async (image) => {

    let img = image.split(process.env.SERVER_HOST)[1];

    let imgPath = path.join(__dirname, '../../public' + img);
    console.log(img);
    if(img && img.indexOf('no-') === -1) {

        console.log('unlinking', imgPath, img);

        try {
            fs.unlinkSync(imgPath), {
                force: true,
            }; 
        } catch (error) {
            // console.log(error)
            
        }
    }
};

export const deleteUserImage = async (id) => {

    let old = await userModel.findById({_id: id});
    await deleteFile(old.picture);

};

export const deleteReviewImage = async (id) => {
    
    let old = await reviewModel.findById({_id: id});
    await deleteFile(old.image);

};

export const deleteStayImage = async (id) => {
    
    let old = await stayModel.findById({_id: id});
    await deleteFile(old.image);

};

export const deleteActivityImage = async (id) => {
    
    let old = await activityModel.findById({_id: id});
    await deleteFile(old.image);

};