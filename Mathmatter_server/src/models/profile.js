const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    userId : { type : String, required : true, unique : true },
    birth : { type : Date, default : Date.now, required : true },
    age : Number,
    phoneNumber : { type : Number, unique : true},
    email : { type : String, unique : true },
    userName : String,
    printList : [Object],
    writeList : [Object]
});

ProfileSchema.statics.findByUserId = function(userId) {
    return this.findOne({userId});
};

ProfileSchema.methods.addPrintList = function(Object) {
    this.printList.push(Object);
}

ProfileSchema.methods.getAge = function() {
    return this.age;
};

ProfileSchema.methods.getPrintList = function() {
    return this.printList;
};

ProfileSchema.methods.getWriteList = function() {
    return this.writeList;
};

module.exports = mongoose.model("Profile", ProfileSchema);