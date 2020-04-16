const mongoose = require('mongoose');

const videos = mongoose.Schema({
  videopath:{
      type:String,
      required:true
  }
});
const Video = mongoose.model('Video', videos);
module.exports = Video