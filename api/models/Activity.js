var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	_id : {
    type: mongoose.Schema.ObjectId,
    default: mongoose.Types.ObjectId
  },
	name : String,
  child:{ type:Schema.ObjectId, ref:'Category' }
});

module.exports = mongoose.model('Activity', activitySchema);
