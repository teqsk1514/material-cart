var Product = require('../models/product');
var mongoose = require('mongoose');
// connect to database
// mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true });
// connection to database with lab


mongoose.connect('mongodb://vrook:vrook1234@ds145438.mlab.com:45438/shopping', { useNewUrlParser: true },()=>{
 console.log('connected to mongodb');
 });


 
// var products = [
//     new Product({
//         imagePath: 'http://media.comicbook.com/2018/01/pubg-4-1070817.jpeg',
//         title: 'pubg mobile',
//         description: 'Awesome Game !!!',
//         price: 10
//     }),

//     new Product({
//         imagePath: 'https://i.pinimg.com/originals/b0/a3/1f/b0a31f39e98518a2b9f828a16d5464e2.jpg',
//         title: 'Anthem Rpg',
//         description: 'Awesome Game !!!',
//         price: 25
//     }),

//     new Product({
//         imagePath: 'http://aptgadget.com/wp-content/uploads/2016/03/Fable-Series-.jpg',
//         title: 'Fable II',
//         description: 'Awesome Game !!!',
//         price: 25
//     }),

//     new Product({
//         imagePath: 'https://www.wallpaperflare.com/static/393/106/379/star-wars-video-games-rpg-poster-wallpaper.jpg',
//         title: 'Battleground',
//         description: 'Awesome Game !!!',
//         price: 25
//     }),

//     new Product({
//         imagePath: 'http://dlair.net/wp-content/uploads/2016/12/sta-bridge-1_orig.jpg',
//         title: 'Star Trek',
//         description: 'Awesome Game !!!',
//         price: 25
//     }),

//     new Product({
//         imagePath: 'https://wallpapershome.com/images/wallpapers/world-of-warcraft-battle-for-azeroth-4480x2520-poster-4k-17829.jpg',
//         title: 'Warcraft',
//         description: 'Awesome Game !!!',
//         price: 25
//     }),

//     new Product({
//         imagePath: 'http://www.gamersdecide.com/sites/default/files/authors/u139001/witcher_2_1.jpg',
//         title: 'witcher',
//         description: 'Awesome Game !!!',
//         price: 25
//     })
// ];

var done = 0;

for (var i=0;i<products.length;i++ ){
    products[i].save((err,result)=>{
        done++;
        if(done===products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
