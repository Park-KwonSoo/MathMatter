const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReplySchema = new Schema ({
    userId : { type : String, required : true },
    body : String,
    date : Date,
});

const WriteSchema = new Schema ({
    userId : { type : String, required : true},
    title : { type : String, required : true },
    body : { type : String, required : true },
    comments : [ReplySchema]
});

WriteSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

WriteSchema.methods.getWriting = function() {
    return this.body;
}

WriteSchema.methods.getComments = function() {
    return this.comments;
}

module.exports = mongoose.model("Write", WriteSchema);
