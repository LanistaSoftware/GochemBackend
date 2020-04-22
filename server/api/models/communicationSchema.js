const mongoose = require('mongoose');

const communicationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  telephone:{
    type:Number,
    required: false
  },
  email:{
    type:String,
    required:true
  },
  message:{
      type:String,
      required:true
  },
  subject:{
      type:String,
      required:true
  },
  date: {
    type: Date,
    default: new Date()
  },
});
const Communication = mongoose.model('Communication', communicationSchema);

module.exports = Communication
