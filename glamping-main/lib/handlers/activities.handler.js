/* 

    Activities Handler.

*/

import dbConnect from "../db/dbConnect.js";
import activityModel from "../db/models/activity.model.mjs";


export const getActivities = async () => {

    let result = {status: 'error', message: `An Error Getting Reviews occured`, data: []};

    try {

        await dbConnect();

        await activityModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Activities fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};