const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["buyer", "owner", "agent"] },
});

userSchema.plugin(plm, { usernameField: "email" });

const UserSchema = mongoose.model("user", userSchema);

module.exports = UserSchema;