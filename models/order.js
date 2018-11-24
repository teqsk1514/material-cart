var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//create the schema.
var schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cart: { type: Object, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    paymentId: { type: String, required: true }
});

//create the model and exports
module.exports = mongoose.model('Order', schema);