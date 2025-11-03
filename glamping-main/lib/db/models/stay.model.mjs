import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const stayScheme = new Schema({
    
    title: { type: String},
    description: { type: String},
    numberOfPersons: { type: String },
    price: { type: Number },
    includes: { type: Array },
    image: { type: String, default: '/stays/no-stays.jpg' },
    created: { type: Date, default : new Date() },

});

export default mongoose.models.stay || mongoose.model('stay', stayScheme);