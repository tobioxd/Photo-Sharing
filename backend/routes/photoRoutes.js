const express = require("express");

const photoController = require("../controllers/photoController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(photoController.getAllPhotos);

router.use("/blog/:userId", photoController.getPhotosByUserId);

router.route("/:id").get(photoController.getPhoto);

router.use(authController.protect);

router.use(authController.restricTo("user"));

router
  .route("/")
  .post(photoController.setPhotoUserIds, photoController.createPhoto);

router
  .route("/:id")
  .patch(photoController.updatePhoto)
  .delete(photoController.deletePhoto);

module.exports = router;
