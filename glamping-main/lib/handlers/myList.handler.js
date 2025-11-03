import dbConnect from "../db/dbConnect.js";
import myListModel from "../db/models/myList.model.mjs";

export const saveList = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};

    try {

        await dbConnect();

        let data = null;
        let exists = await myListModel.findOne({name: body.name});

        if(body.activityIds !== undefined){

            body.activityIds = body.activityIds.split(',');
        
        }

        if(exists){

            return await myListModel.findOneAndUpdate({_id : id}, body, {new: true});

        } else {
            
            data = await myListModel.create(body);
        }



        result = {status: 'ok', message: "Review created successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}