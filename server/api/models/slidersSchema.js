const mongoose = require('mongoose');

const sliderschema = mongoose.Schema({
  sliderName:{
    type:String,
    required:true,
    max:120,
    min:2,
  },
  SliderOne: {
   type:Object,
   required:true,
   max:120,
   min:2,
  },
  SliderTwo: {
   type:Object,
   required:true,
   max:120,
   min:2,
  },
  SliderThree: {
   type:Object,
   required:true,
   max:120,
   min:2,
  },
  creationdate: {
    type: Date,
    default: new Date().toLocaleString()
  },
  active:{
    type:Boolean,
    required:false,
    default:false,
  }
});
const User = mongoose.model('Slider', sliderschema);

module.exports = User
