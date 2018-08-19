var express = require("express")
var router = express.Router()
var User = require("../models/user");
var passport = require("passport")

//Show Login Form
router.get("/login", function(req, res) {
    res.render("users/login", { message: "" /*req.flash('loginMessage')*/ }); //TODO: Flash
});

//Process Login
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/projects",
        failureRedirect: "/login",
        // failureFlash: true,
        // successFlash: 'Welcome to YelpCamp!'
    }), function(req, res){
});

//Show Register Form
router.get('/register', function(req, res) {
    res.render('users/register', { message: "" /*req.flash('signupMessage')*/ }) //TODO: Flash
})

//Process Register
router.post('/register', function(req, res) {
    console.log(req.body.username)
    if (req.body.password == req.body.register_repassword) {
        var newUser = new User({
            username: req.body.username,
            fullname: req.body.register_firstname + " " + req.body.register_lastname,
            initials: req.body.register_firstname.charAt(0) + req.body.register_lastname.charAt(0)
        });
        User.register(newUser, req.body.password, function(err, user) {
            if (err) {
                console.log(err)
                return res.render("users/register", { message: err.message })
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/projects")
            });
        });
    }
    else {
        /*req.flash('signupMessage', 'Both passwords do not match!');*/ //TODO:Flash
        res.redirect("/register");
    }
})

//Logout
router.get("/logout", function(req, res){
   req.logout();
//   req.flash("success", "See you later!");
   res.redirect("/");
});

module.exports = router;