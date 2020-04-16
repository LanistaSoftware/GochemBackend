const mongoose = require('mongoose');

const aboutUs = mongoose.Schema({
    content:{
    type:String,
    required:true,
    min:5,
    
    },
    imgUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date()
  },
});
const aboutUsSchema = mongoose.model('aboutUs', aboutUs);

module.exports = aboutUsSchema
