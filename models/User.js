const { type } = require('@testing-library/user-event');
const mongoose = require('mongoose');


const UserSchemas = new mongoose.Schema({
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email:{
        type: String,
        required:true,
    },
    password: {
      type: String,
      required:true,
    },
  },
  {
    timestamps : true,
  }
);
  
  // Create and export the model based on the schema
module.exports = mongoose.model('Users', UserSchemas);