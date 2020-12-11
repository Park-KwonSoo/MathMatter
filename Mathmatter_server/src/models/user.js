const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    userId : { type : String, required : true },
    hashedPassword : String,
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

UserSchema.methods.serealize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function () {
    const token = jwt.sign (
        {
            _id : this.id,
            userId : this.userId
        },
        process.env.JWT_SECRET,
        { expiresIn : "7d" }
    );
    return token;
};

module.exports = mongoose.model("User", UserSchema);
