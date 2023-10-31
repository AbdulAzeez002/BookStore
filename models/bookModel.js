const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'please add book name'],
    },
    author: {
        type: String,
        required: [true, 'please add author name']
    },
    summary: {
        type: String,
        required: [true, 'please add  book summary']
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('book', bookSchema)