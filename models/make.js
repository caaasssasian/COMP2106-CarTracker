// reference mongoose
const mongoose = require('mongoose');

// create the make schemas
const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    country: {
        type: String,
        required: 'Model is required'
    },
    year: {
        type: Number,
        required: 'Year founded is required'
    }
});

// make it public
module.exports = mongoose.model('Make', makeSchema);