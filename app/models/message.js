var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  body: {type : String, default : '', trim : true},
  to: {type : Schema.ObjectId, ref : 'User'},
  from: {type : Schema.ObjectId, ref : 'User'},
  createdAt  : {type : Date, default : Date.now},
  localTimeStamp: {type: Date, default: Date.now}
});

MessageSchema.path('to').required(true, 'Message needs to be addressed to a user');
MessageSchema.path('body').required(true, 'Message body cannot be blank');


MessageSchema.methods = {};

MessageSchema.statics = {
  list: function (options, cb) {
    var criteria = options.criteria || {};

    this.find(criteria)
      .sort({'createdAt': -1})
      .exec(cb);
  }
};

mongoose.model('Message', MessageSchema);
