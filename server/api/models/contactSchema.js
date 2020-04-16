const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    min:3,
    max:100
  },
  
  email: {
    type: String,
    required: true,
    min:3,
  },
  telephone: {
    type: Number,
    required: true,
    min:3,
  },
  fax:{
    type: Number,
    required: true,
    min:3,
  },
  adress:{
    type: String,
    required: true,
    min:3,
  },
  date: {
    type: Date,
    default: new Date()
  },
});
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact
