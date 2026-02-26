const {Schema, model} = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    salt: {type: String},
    password: {type: String, required: true},
    role: {type: String, enum: ["USER", "ADMIN"], default: "USER"}
});

userSchema.pre("save", function () {
    if (!this.isModified("password")) return;

    const salt = randomBytes(10).toString("hex");
    const hash = createHmac("sha256", salt)
        .update(this.password)
        .digest("hex");
    this.salt = salt;
    this.password = hash;
});

userSchema.static("checkUserPassword",async function (email, password){
    const user = await this.findOne({email});
    if (!user){
        throw new Error("invalid Email address");
    }
    const salt = user.salt;
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if ( hashedPassword !== user.password){
        throw new Error("Invalid password");
    }
    return user;
})
const User = model("User",userSchema);
module.exports = User;
