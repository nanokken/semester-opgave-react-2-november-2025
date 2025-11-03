import dbConnect from "../db/dbConnect.js";
import reviewModel from "../db/models/review.model.mjs";


/* 

    QandAs Handler

*/

export const getReviews = async () => {

    let result = {status: 'error', message: `An Error Getting Reviews occured`, data: []};

    try {

        await dbConnect();

        await reviewModel.find({}).then((data) => {  

            result = {status: 'ok', message: "Reviews fetched successfully", data: data}

        }).catch((error) => {

            console.log(error)

        });

        return result;

    } catch (error) {

        console.log(error)

    }

};