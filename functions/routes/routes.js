module.exports = function(app) {
    app.get('/', function(req, res){
        res.render('pages/login');
    })
    
    app.get('/login', function(req, res){
        res.render('pages/login')
    })
    app.post('/login', function(req, res){
        var email = req.body.login_email;
        var password = req.body.login_email;
    })

    app.get('/register', function(req, res){
        res.render('pages/register')
    })
    
    app.post('/register', function(req, res){
        var email = req.body.register_email;
        var password = req.body.register_password;

        var displayName = req.body.register_firstname + " " + req.body.register_lastname;

        
    })

    app.get('/dashboard', function(req, res){
        res.render('pages/dashboard')
    })

    app.get('/createproject', function(req, res){
        res.render('pages/add_project')
    })
}