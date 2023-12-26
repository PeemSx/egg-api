const {type} = require('@testing-library/user-event');
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorID:{
        type: String,
        required:true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps : true,
  }
);
  
  // Create and export the model based on the schema
module.exports = mongoose.model('BlogPost', blogPostSchema);