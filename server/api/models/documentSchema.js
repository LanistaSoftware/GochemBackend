const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path:{
    type:String,
    required:true
  },
  date: {
    type: Date,
    default: new Date()
  },

});
const Document = mongoose.model('Document', documentSchema);

module.exports = Document
