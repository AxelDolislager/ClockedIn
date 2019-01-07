var express = require("express");
var router  = express.Router({mergeParams: true});
var Task = require("../models/task")
var Project = require("../models/project")

function twoDigits(timing){
    if(timing <= 9){
        return "0" + timing;
    }else{
        return timing;
    }
}

//CREATE - add new project to DB
router.post("/", function(req, res){
    console.log(req.body)
    Project.findById(req.params.id, function(err, project){
        if(err){
            console.log(err);
            res.redirect("/projects/" + req.params.id);
        } else {
            var timestamp = new Date();
            var startTime = new Date(req.body.create_task_start_time).getTime();
            var endTime   = new Date(req.body.create_task_end_time).getTime();
            if(startTime < endTime){
                console.log("adding new task!");
                var newTask = {
                    description: req.body.create_task_desc,
                    startTime: startTime,
                    endTime: endTime,
                    duration: (endTime - startTime)/1000
                }
                Task.create(newTask, function(err, task){
                    if(err){
                        console.log(err);
                    }else{
                        project.totalTimeSpend = project.totalTimeSpend + task.duration;
                        project.tasks.push(task);
                        project.save();
                        console.log(task);
                        console.log(project);
                        res.redirect('/projects/' + req.params.id);
                    }
                })
            }else{
                res.redirect('/projects/' + req.params.id + "/tasks/new")
            }
        }
    })
});

//NEW - show form to create new task 
router.get("/new", function(req, res){
    var projectId = req.params.id
    res.render("tasks/new", {projectId: projectId, current_page: "none"}); 
});


// EDIT - shows edit form for a task
router.get("/:id2/edit", function(req, res){
    Task.findById(req.params.id2, function(err, task){
        if(err){
            console.log(err)
        }else{
            //set everything to a 2 digit number!
            var startTimeFormat = twoDigits(new Date(task.startTime).getFullYear()) + "/" + twoDigits(new Date(task.startTime).getMonth() + 1) + "/" + twoDigits(new Date(task.startTime).getDay() - 1) + " " + twoDigits(new Date(task.startTime).getHours() + 1) + ":" + twoDigits(new Date(task.startTime).getMinutes() + 1) + ":" + twoDigits(new Date(task.startTime).getSeconds());
            var endTimeFormat = twoDigits(new Date(task.endTime).getFullYear()) + "/" + twoDigits(new Date(task.endTime).getMonth() + 1) + "/" + twoDigits(new Date(task.endTime).getDay() - 1) + " " + twoDigits(new Date(task.endTime).getHours() + 1) + ":" + twoDigits(new Date(task.endTime).getMinutes() + 1) + ":" + twoDigits(new Date(task.endTime).getSeconds());
            
            res.render("tasks/edit", {projectId: req.params.id, task: task, taskStartTime: startTimeFormat, taskEndTime: endTimeFormat, current_page: "none"})
        }
    });
});

//PUT - edit's a task
router.put("/:id2", function(req, res){
    //get project by id
    var duration = 0;
    
    Project.findById(req.params.id, function(err, project){
        if(err){
            console.log(err);
            res.redirect("/projects/" + req.params.id + "/tasks/" + req.params.id2 + "/edit");
            //FLASH
        }else{
            //find task before changing
            Task.findById(req.params.id2, function(err, task){
                //totalprojecttime - tasktime
                var totalTimeWOEditTask = project.totalTimeSpend - task.duration;
                
                //edit task
                task.set({
                    description: req.body.edit_task_desc,
                    startTime: req.body.edit_task_start_time,
                    endTime: req.body.edit_task_end_time,
                    duration: (new Date(req.body.edit_task_end_time).getTime() - new Date(req.body.edit_task_start_time).getTime())/1000
                });
                task.save();
                
                //totalprojecttime + tasktime
                project.set({totalTimeSpend: totalTimeWOEditTask + ((new Date(req.body.edit_task_end_time).getTime() - new Date(req.body.edit_task_start_time).getTime())/1000)})
                project.save();
                
                res.redirect("/projects/" + req.params.id);
            });
        }
    });
});

//DELETE - delete's task from database
router.delete("/:id2", function(req, res){
    //get task duration
    var duration = 0;
    
    Task.findById(req.params.id2, function(err, task){
        if(err){
            console.log(err);
            res.redirect("/projects/" + req.params.id + "/tasks/" + req.params.id2 + "/edit");
            //FLASH
        }else{
            duration = (new Date(task.endTime).getTime() - new Date(task.startTime).getTime())/1000;
            
            //projecttime - tasktime
            Project.findById(req.params.id, function(err, project){
                if(err){
                    console.log(err);
                    res.redirect("/projects/" + req.params.id + "/tasks/" + req.params.id2 + "/edit");
                }else{
                    project.totalTimeSpend = project.totalTimeSpend - duration;
                    project.save();
                }
            })
            
            task.remove();
            res.redirect("/projects/" + req.params.id);
        }
    });
})

module.exports = router;