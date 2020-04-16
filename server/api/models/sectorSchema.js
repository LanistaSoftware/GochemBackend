const mongoose = require('mongoose');

const sectorSchema = mongoose.Schema({
  sectorname:{
    type:String,
    required:true,
    min:3,
    max:100
  },
  
  sectordescription: {
    type: String,
    required: true,
    min:3,
  },
  date: {
    type: Date,
    default: new Date()
  },
});
const Sector = mongoose.model('Sector', sectorSchema);

module.exports = Sector
