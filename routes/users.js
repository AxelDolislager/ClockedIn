var express     = require("express")
var router      = express.Router()
var User        = require("../models/user");
var middleware  = require("../middleware")
var passport    = require("passport")

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
router.get("/logout", middleware.isLoggedIn, function(req, res){
   req.logout();
//   req.flash("success", "See you later!");
   res.redirect("/");
});

//Usersettings
router.get("/settings", middleware.isLoggedIn, function(req, res){
    res.render("users/settings", {current_page: "settings"});
})


//Change Password
router.post("/settings/password", middleware.isLoggedIn, function(req, res){
    //changePassword(oldPassword, newPassword, [cb])
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err)
            //TODO flash
            res.redirect("/settings");
        } else {
            if(req.body.new_password == req.body.repeat_new_password){
                foundUser.changePassword(req.body.old_password, req.body.new_password, function(err){
                    if (err){
                        console.log(err)
                        // TODO Flash Error
                        console.log("Cant change password")
                        res.redirect("/settings");
                    }
                    res.redirect("/settings");
                })
            } else {
                // TODO flash passwords don't match
                console.log("Passwords don't match")
                res.redirect("/settings");
            }
        }
    })
})

module.exports = router;