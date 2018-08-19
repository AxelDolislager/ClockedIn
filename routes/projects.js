var express = require("express");
var router  = express.Router();
var Project = require("../models/project")

//INDEX - show all projects from a user
router.get("/", function(req, res){                             //isloggedin
  // Get all projects from the user from DB
  Project.find({}, function(err, allProjects){
     if(err){
         console.log(err);
     } else {
        res.render("projects/index", {projects: allProjects});
     }
  });
});

//CREATE - add new project to DB
router.post("/", function(req, res){
  var projectName = req.body.add_project_name
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  Project.create({projectName: projectName, author: author}, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/projects");
        }
    });
});

//NEW - show form to create new project 
router.get("/new", function(req, res){
   res.render("projects/new"); 
});

// SHOW - shows more info about one project
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Project.findById(req.params.id, function(err, project){
        if(err){
            console.log(err);
        } else {
            //render show template with project data
            res.render("projects/show", {project: project});
        }
    });
});

// EDIT - shows edit form for a project
router.get("/:id/edit", function(req, res){
  
});

// PUT - updates project in the database
router.put("/:id", function(req, res){
  
});

// DELETE - removes project and its tasks from the database
router.delete("/:id", function(req, res) {
    
});

module.exports = router;
