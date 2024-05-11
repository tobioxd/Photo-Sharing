const Photo = require('../models/photoModel');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.setPhotoUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getPhotosByUserId = async (req, res, next) => {
    const{userId} = req.params;

    const photo = await Photo.find({user: userId});

    if(!photo){
        return next(new AppError('No photo found with that ID', 404));
    }

    res.status(200).json(photo);
}

exports.getAllPhotos = factory.getAll(Photo);
exports.getPhoto = factory.getOne(Photo);
exports.createPhoto = factory.createOne(Photo); 
exports.updatePhoto = factory.updateOne(Photo);
exports.deletePhoto = factory.deleteOne(Photo);