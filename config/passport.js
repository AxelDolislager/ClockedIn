var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Register
    passport.use('local-signup', new LocalStrategy({
        usernameField   : 'register_email',
        passwordField   : 'register_password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            if(password == req.param("register_repassword")){
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.fullname = req.param('register_firstname') + " " + req.param('register_lastname');
                        newUser.local.initials = req.param('register_firstname').charAt(0) +  req.param('register_lastname').charAt(0);

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            }else{
                return done(null, false, req.flash('signupMessage', 'Both passwords do not match!'));
            }
        });
    }));

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'login_email',
        passwordField : 'login_password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, user);
        });

    }));

};