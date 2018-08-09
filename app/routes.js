module.exports = function(app, passport) {
    app.get('/', isNotLoggedIn, function(req, res){
        res.render('pages/login', { message: req.flash('loginMessage') });
    })
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/dashboard',
        failureRedirect : '/login',
        failureFlash : true
    }))

    
    app.get('/login', isNotLoggedIn, function(req, res){
        res.render('pages/login', { message: req.flash('loginMessage') })
    })
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard',
        failureRedirect : '/login',
        failureFlash : true
    }))


    app.get('/register', isNotLoggedIn, function(req, res){
        res.render('pages/register', { message: req.flash('signupMessage') })
    })
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/dashboard',
        failureRedirect : '/register',
        failureFlash : true
    }))

    
    app.get('/dashboard', isLoggedIn, function(req, res){
        res.render('pages/dashboard', {user: req.user})
    })

    app.get('/createproject', isLoggedIn, function(req, res){
        res.render('pages/add_project')
    })

    app.get('/project', isLoggedIn, function(req, res){
        res.render('pages/project')
    })

    app.get('/addtiming', isLoggedIn, function(req, res){
        res.render('pages/add_timing')
    })

    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })
}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/dashboard');
}