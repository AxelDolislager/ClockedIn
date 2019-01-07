var Project = require("../models/project");

module.exports = {
    isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
        return next();
      }
      // req.flash('error', 'You must be signed in to do that!');
      res.redirect('/login');
    }, 
    
    checkProjectOwnership: function(req, res, next){
      if(req.isAuthenticated()){
        Project.findById(req.params.id, function(err, foundProject){
            if(err){
              res.redirect("back")
            } else {
              //does user own the project
              if(foundProject.author.id.equals(req.user.id)){
                next()
              } else {
                res.redirect("back")
              }
            }
        })
      } else {
        res.redirect("back")
      }
    }
}

