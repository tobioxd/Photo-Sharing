const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please provide a comment!']
    },
    date_time: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, 'Please provide a user!']
    },
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: "Photo",
        required: [true, 'Please provide a photo!']
    }
});

commentSchema.pre(/^find/, function(next){
    this.populate({
        path: "user",
        select: "name photo"
    });
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;