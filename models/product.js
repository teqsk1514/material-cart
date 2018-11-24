var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//create the schema.
var  schema = new Schema({
    imagePath : {type:String , required:true},
    title : {type:String , required:true},
    description : {type:String , required:true},
    price : {type:Number , required:true}
});

//create the model and exports
module.exports =  mongoose.model('Product',schema);