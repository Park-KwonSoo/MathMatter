const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    userId : { type : String, required : true, unique : true },
    birth : { type : Date, default : Date.now, required : true },
    age : Number,
    phoneNumber : { type : Number, unique : true, sparse : true },
    email : { type : String, unique : true },
    userName : String,
    printList : [Object]
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

ProfileSchema.methods.getAge = function() {
    return this.age;
};

ProfileSchema.methods.getPrintList = function() {
    return this.printList;
};

ProfileSchema.methods.havePrint = function(_id) {
    let i;
    for(i = 0; i < this.printList.length; i++) 
        if(this.printList[i]._id.equals(_id)) 
            return true;
    
    return false;
};

module.exports = mongoose.model("Profile", ProfileSchema);