/* 

    Activities Handler.

*/

import dbConnect from "../db/dbConnect.js";
import contactModel from "../db/models/contact.model.js";

export const getContacts = async () => {

    let result = {status: 'error', message: `An Error Getting Contacts occured`, data: []};

    try {

        await dbConnect();

        await contactModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Contacts fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};