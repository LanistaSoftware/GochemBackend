const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

  prdoudctName: {
    type: String,
    required: true,
    min:4,
    max:20,
  },
  prdoudctGroup: {
    type: String,
    required: true,
    min:4,
    max:100,
  },
  productDesc:{
      type:String,
      required:true,
      min:4,
      max:100,
  },
  productMoreDesc:{
    type:String,
    required:true,
    min:4,
    max:10000,
},
  date: {
    type: Date,
    default: new Date().toLocaleString()
  },

});
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product
