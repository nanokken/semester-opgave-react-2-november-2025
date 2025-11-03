import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const activityScheme = new Schema({
    title: { type: String},
    description: { type: String},
    date : { type : String},
    time : { type : String},
    image: { type: String, default: '/activities/no-activity.jpg' },
    created: { type: Date, default : new Date() },

});

export default mongoose.models.activity || mongoose.model('activity', activityScheme);