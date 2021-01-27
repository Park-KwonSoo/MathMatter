const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    userId : { type : String, required : true, unique : true },
    birth : { type : Date, default : Date.now, required : true },
    age : Number,
    phoneNumber : { type : Number },
    email : { type : String, unique : true, sparse : true },
    userName : String,
    printList : [Object],
    writeList : [Object]
});

ProfileSchema.statics.findByUserId = function(userId) {
    return this.findOne({userId});
};

ProfileSchema.statics.findByEmail = function(email) {
    return this.findOne({email});
};

ProfileSchema.methods.addPrintList = function(Object) {
    this.printList.push(Object);
};

ProfileSchema.methods.addWriteList = function(Object) {
    this.writeList.push(Object);
};

ProfileSchema.methods.getAge = function() {
    return this.age;
};

ProfileSchema.methods.getPrintList = function() {
    return this.printList;
};

ProfileSchema.methods.getWriteList = function() {
    return this.writeList;
};

ProfileSchema.methods.deleteWrite = function(_id) {
    let i = 0;
    for(i = 0; i < this.writeList.length; i++){
        if(this.writeList[i]._id.equals(_id)) {
            break;
        }
    }

    this.writeList.splice(i, 1);
};

module.exports = mongoose.model("Profile", ProfileSchema);