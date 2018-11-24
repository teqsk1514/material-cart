var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport');

var Cart = require('../models/cart');
var Order = require('../models/order');



//start thr csrf protection as the middleware.
var csrfProtection = csurf();
//all the routes included in the router packages should be protected with csrfProtection
router.use(csrfProtection);


router.get('/profile', isLoggedIn, (req, res, next) => {
    Order.find({
        user: req.user,
    }, (err, orders) => {
        if (err) {
            return res.write('Error');
        }

        var cart;
        orders.forEach((order) => {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });

        res.render('user/profile', { orders: orders })
    });
});

// logout should  be availabe is u r logged in 
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, (req, res, next) => {
    next();
});

//pass the token to the the signup page.
router.get('/signup', (req, res) => {
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), (req, res, next) => {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});


router.get('/signin', (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 });
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), (req, res, next) => {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});






module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}