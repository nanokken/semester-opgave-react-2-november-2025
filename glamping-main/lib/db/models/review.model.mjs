import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const reviewScheme = new Schema({
    name: { type: String, required: true},
    age: { type: Number, required: true},
    image: {type: String, default:"/reviews/no-review.jpg"},
    review: { type: String , required: true},
    stay: { type: String},
    created: { type: Date, default : new Date() },
});

export default mongoose.models.review || mongoose.model('review', reviewScheme);