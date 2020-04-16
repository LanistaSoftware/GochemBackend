const mongoose = require('mongoose');

const referenceschema = mongoose.Schema({

  referenceName: {
    type: String,
    required: true,
    min:4,
    max:20,
  },
  referenceUrl: {
    type: String,
    required: true,
    min:4,
    max:100,
  },
  imageUrl:{
      type:String,
      required:true,
      min:4,
      max:100,
  },
  date: {
    type: Date,
    default: new Date().toLocaleString()
  },

});
const Blog = mongoose.model('Reference', referenceschema);

module.exports = Blog
