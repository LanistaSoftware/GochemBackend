const mongoose = require('mongoose');

const Logo = mongoose.Schema({
  Logoname:{
    type:String,
    required:true,
    min:3,
    max:100
  },
  date: {
    type: Date,
    default: new Date()
  },
});
const LogoSchema = mongoose.model('CompanyLogo', Logo);

module.exports = LogoSchema
