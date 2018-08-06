module.exports = function(app) {
    app.get('/', function(req, res){
        res.render('pages/login');
    })
    
    app.get('/login', function(req, res){
        res.render('pages/login')
    })
    app.post('/login', function(req, res){

    })

    app.get('/register', function(req, res){
        res.render('pages/register')
    })

    app.get('/dashboard', function(req, res){
        res.render('pages/dashboard')
    })

    app.get('/createproject', function(req, res){
        res.render('pages/add_project')
    })

    app.get('/project', function(req, res){
        res.render('pages/project')
    })

    app.get('/addtiming', function(req, res){
        res.render('pages/add_timing')
    })
}