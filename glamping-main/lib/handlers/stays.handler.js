/* 

    Stays Handler.

*/

import dbConnect from "../db/dbConnect.js";
import stayModel from "../db/models/stay.model.mjs";

export const getStays = async () => {

    let result = {status: 'error', message: `An Error Getting Stays occured`, data: []};

    try {

        await dbConnect();

        await stayModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Stays fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};