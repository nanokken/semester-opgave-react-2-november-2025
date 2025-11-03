import dbConnect from "../db/dbConnect.js";
import contactModel from "../db/models/contact.model.js";

export const addContact = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};

    try {

        await dbConnect();

        let data = await contactModel.create(body);
        result = {status: 'ok', message: "Stay created successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}