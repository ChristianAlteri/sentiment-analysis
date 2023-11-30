const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    data: [
        {
            text: String,
            sentiment: {
                score: Number,
                label: String
            },
            relevance: Number,
            emotion: {
                sadness: Number,
                joy: Number,
                fear: Number,
                disgust: Number,
                anger: Number
            },
            count: Number
        }
    ]
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;