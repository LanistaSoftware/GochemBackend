const mongoose = require('mongoose');

const employeSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    min:3,
    max:100
  },
  
  task: {
    type: String,
    required: true,
    min:3,
  },
  order: {
    type: String,
    required: true,
    min:3,
  },
  imgUrl:{
    type: String,
    required: true,
    min:3,
  },
  date: {
    type: Date,
    default: new Date()
  },
});
const Employe = mongoose.model('Employe', employeSchema);

module.exports = Employe
