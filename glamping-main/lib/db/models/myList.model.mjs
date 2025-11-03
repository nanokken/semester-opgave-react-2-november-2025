import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const myListSchema = new Schema({
    email: { type: String, required: true},
    activityIds: { type: Array, default: [], required: true},
    created: { type: Date, default : new Date() },
});

export default mongoose.models.myList || mongoose.model('myList', myListSchema);