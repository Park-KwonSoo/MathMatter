const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

//댓글 스키마
const ReplySchema = new Schema ({
    userId : { type : String, required : true },
    body : String,
    date : Date,
});

const WriteSchema = new Schema ({
    userId : { type : String, required : true},
    postId : Number,
    title : { type : String, required : true },
    date : { type : Date, default : Date.now},
    body : { type : String, required : true },
    comments : [ReplySchema]
});

WriteSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

WriteSchema.statics.findByPostId = function(postId) {
    return this.findOne({ postId });
}

WriteSchema.methods.getWriting = function() {
    return this.body;
}

WriteSchema.methods.getComments = function() {
    return this.comments;
}

autoIncrement.initialize(mongoose.connection);
WriteSchema.plugin(autoIncrement.plugin, {
    model : "Write",
    field : "postId",
    startAt : 1,
    increment : 1
})

module.exports = mongoose.model("Write", WriteSchema);
