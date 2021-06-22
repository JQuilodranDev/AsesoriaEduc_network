const moongoose = require('mongoose');

const PostSchema = new moongoose.Schema({
  user: {
      type: mongoose.Schema.Types.objectId,
      ref: 'user',
  },
  text: {
      type: String,
  },
  file: {
      type:String,
  },
  created_At: {
      String,
  },
},
{ timestamps: true},
);

module.exports = moongoose.model('post', PostSchema);

