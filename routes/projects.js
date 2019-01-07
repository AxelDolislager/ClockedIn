var express         = require("express");
var router          = express.Router();
var Project         = require("../models/project");
var middleware      = require("../middleware")
var methodOverride  = require("method-override");

//INDEX - show all projects from a user
router.get("/", middleware.isLoggedIn, function(req, res){                  
  // Get all projects from the user from DB
  Project.find({"author.username": req.user.username}, function(err, allProjects){
     if(err){
         console.log(err);
     } else {
        res.render("projects/index", {projects: allProjects, current_page: "home"});
     }
  });
});

//CREATE - add new project to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  var projectName = req.body.add_project_name
  var projectDescription = req.body.add_project_description
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  Project.create({projectName: projectName, projectDescription: projectDescription, author: author}, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to projects page
            res.redirect("/projects/" + newlyCreated._id);
        }
    });
});

//NEW - show form to create new project 
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("projects/new", {current_page: "none"}); 
});

// SHOW - shows more info about one project
router.get("/:id", middleware.checkProjectOwnership, function(req, res){
    //find the project with provided ID
    Project.findById(req.params.id).populate("tasks").exec(function(err, project){
        if(err){
            console.log(err);
        } else {
            //render show template with project data
            res.render("projects/show", {project: project, current_page: "home"});
        }
    });
});

// EDIT - shows edit form for a project
router.get("/:id/edit", middleware.checkProjectOwnership, function(req, res){
    Project.findById(req.params.id, function(err, project){
        if(err){
            console.log(err)
        }else{
            res.render("projects/edit", {project: project, current_page: "home"})
        }
    })
});

// PUT - updates project in the database
router.put("/:id", middleware.checkProjectOwnership, function(req, res){
    console.log("Editing project.");
    console.log(req.body);
    
    var newData = {projectName: req.body.edit_project_name, projectDescription: req.body.edit_project_description};
    
    Project.findByIdAndUpdate(req.params.id, newData, function(err, project){
        if(err){
            console.log(err);
            res.redirect("/projects/" + req.params.id + "/edit")
        }else{
            res.redirect("/projects/" + req.params.id)
        }
    });
});

// DELETE - removes project and its tasks from the database
router.delete("/:id", middleware.checkProjectOwnership, function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/projects/" + req.params.id + "/edit");
        }else{
            res.redirect("/projects");
        }
    });
});

module.exports = router;
