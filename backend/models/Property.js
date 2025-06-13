const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    location: String,
    type: String, // e.g., 1BHK, Plot
    status: { type: String, default: "available" },
    listingType: { type: String, enum: ['buy', 'rent'], required: true }, // 👈 New
    category: { type: String, enum: ['luxury', 'commercial'], required: true }, // 👈 New
    amenities: [String],
    gallery: [String],
    videos: [String],
    floorPlans: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
