const express = require("express");

const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(commentController.getAllComments);

router.use("/photo/:photoId", commentController.getCommentByPhoto);

router.route("/:id").get(commentController.getComment);

router.use(authController.protect);

router.use(authController.restricTo("user"));

router
  .route("/")
  .post(commentController.setCommentUserIds,commentController.createComment);

router
  .route("/:id")
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
