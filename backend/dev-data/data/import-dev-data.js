const fs = require('fs');   
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../../models/userModel');
const Photo = require('../../models/photoModel');
const Comment = require('../../models/commentModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);

const photos = JSON.parse(
  fs.readFileSync(`${__dirname}/photos.json`, 'utf-8')
);

const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/comments.json`, 'utf-8')
);


// IMPORT DATA INTO DB
const importData = async () => {
  try {
    //await User.create(users, { validateBeforeSave: false });
    await Photo.create(photos);
    await Comment.create(comments);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    //await User.deleteMany();
    await Photo.deleteMany();
    await Comment.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if(process.argv[2] === '--import'){
  importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);