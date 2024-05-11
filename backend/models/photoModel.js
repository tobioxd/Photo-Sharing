const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    file_name:{
        type: String,
        required: [true, 'Please provide a file name!']
    },
    date_time:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, 'Please provide a user!']
    }
});

photoSchema.pre(/^find/, function(next){
    this.populate({
        path: "user",
        select: "name photo"
    });
    next();
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;