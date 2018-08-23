var express = require("express");
var router  = express.Router({mergeParams: true});
var Task = require("../models/task")
var Project = require("../models/project")


//CREATE - add new project to DB
router.post("/", function(req, res){
    console.log(req.body)
    Project.findById(req.params.id, function(err, project){
        if(err){
            console.log(err);
            res.redirect("/projects/" + req.params.id);
        } else {
            var timeStamp = new Date()
            var startTime = new Date(timeStamp.getFullYear(), timeStamp.getMonth(), timeStamp.getDate(), req.body.create_task_start_time.split(":")[0], req.body.create_task_start_time.split(":")[1], 0)
            var stopTime = new Date(timeStamp.getFullYear(), timeStamp.getMonth(), timeStamp.getDate(), req.body.create_task_end_time.split(":")[0], req.body.create_task_end_time.split(":")[1], 0)
            var newTask = {
                description: req.body.create_task_desc,
                startTime: startTime,
                endTime: stopTime,
                duration: (stopTime.getTime()-startTime.getTime())/1000 // in seconds
            }
            Task.create(newTask, function(err, task){
               if(err){
                   console.log(err);
               } else {
                   project.totalTimeSpend = project.totalTimeSpend + task.duration
                   project.tasks.push(task);
                   project.save();
                   console.log(task)
                   console.log(project)
                   res.redirect('/projects/' + req.params.id);
               }
            })
        }
    })
});

//NEW - show form to create new project 
router.get("/new", function(req, res){
    var projectId = req.params.id
    res.render("tasks/new", {projectId: projectId}); 
});

module.exports = router;