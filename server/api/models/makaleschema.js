const mongoose = require('mongoose');

const blogschema = mongoose.Schema({
  // user: {
  //   type: String,
  //   required: false
    
  // },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },

});
const Blog = mongoose.model('Blog', blogschema);

module.exports = Blog
