const mongoose = require('mongoose');

const creativeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    place: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Creative', creativeSchema);

