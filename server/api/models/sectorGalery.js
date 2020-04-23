const mongoose = require('mongoose');

const sectorGalery = mongoose.Schema({

  imgUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date()
  },
});
const SectorGalery = mongoose.model('galery', sectorGalery);

module.exports = SectorGalery