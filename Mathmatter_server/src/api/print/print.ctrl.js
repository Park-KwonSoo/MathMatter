const mongoose = require("mongoose");
const Print = require("../../modles/print");
const Profile = require("../../models/profile");
const Question = require("../../models/question");


exports.setPrint = async (ctx, next) => {
    try{
        const { userId } = ctx.request.body;
        const print = await Print.findByUserId(userId);
        const profile = await Profile.findByUserId(userId);
        const age = profile.getAge();
        

        

    } catch(e) {
        ctx.throw(500, e);
    }
};

exports.printing = async (ctx) => {

};