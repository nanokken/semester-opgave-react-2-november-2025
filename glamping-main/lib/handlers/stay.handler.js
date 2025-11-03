import dbConnect from "../db/dbConnect.js";
import stayModel from "../db/models/stay.model.mjs";
import { deleteReviewImage, deleteStayImage } from "./file.handler.js";

export const getStayById = async (id) => {

    let result = {status: 'error', message: `An Error Getting Stay occured`, data: []};

    try {

        await dbConnect();

        await stayModel.find({_id : id}).then((data) => {  
            console.log(data)

            if(data.length === 0) {
                
                result = {status: 'error', message: "No stay to fetch", data: data}
            } else {

                result = {status: 'ok', message: "Stay fetched successfully", data: data}
            }

          

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {
        
        console.log(error)

    }

};

export const addStay = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};
    console.log(body)
    try {

        await dbConnect();
        body.image = body.image === undefined  ? `${process.env.SERVER_HOST}/reviews/no-review.jpg` : body.image;
   
        let data = await stayModel.create(body);
        result = {status: 'ok', message: "Stay created successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}

export const updateStay = async (body) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};

    try {

        await dbConnect();
        if(body.image !== undefined)
        {
            await deleteStayImage(body.id);
        }
     
        if(body.includes){
            body.includes = body.includes.split(',');
        }
       
      

        let data = await stayModel.findByIdAndUpdate({_id: body.id}, body, {new: true});
        result = {status: 'ok', message: "Stay updated successfully", data: data}

    } catch (error) {   

        console.log(error)

    }

    return result

}

export const deleteStay = async (id) => {

    let result = {status: 'error', message: `An Error Deleting review ${id} occurred`, data: []};

    try {

        await dbConnect();
        await deleteStayImage(id);

        await stayModel.findByIdAndDelete({_id: id}).then((data) => {  

            result = {status: 'ok', message: "Stay deleted successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {

        console.log(error)

    }

};