var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//create the schema.
var userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//encrypt the password.
userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};

//check the password.
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);//this refers to the current user.
}
//create the model and exports
module.exports = mongoose.model('User', userSchema);


