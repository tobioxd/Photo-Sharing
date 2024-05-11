const Comment = require('../models/commentModel');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');

exports.setCommentUserIds = (req, res, next) => {
    // Allow nested routes
    if(!req.body.user) req.body.user = req.user.id;
    if(!req.body.photo) req.body.photo = req.params.photoId;
    next();
}

exports.getCommentByPhoto = async (req, res, next) => {
    const{photoId} = req.params;

    const comment = await Comment.find({photo: photoId});

    if(!comment){
        return next(new AppError('No comment found with that ID', 404));
    }

    res.status(200).json(comment);
}

exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);