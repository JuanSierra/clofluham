var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	_id : {
    type: mongoose.Schema.ObjectId,
    default: mongoose.Types.ObjectId
  },
	name : String
});

module.exports = mongoose.model('Category', categorySchema);