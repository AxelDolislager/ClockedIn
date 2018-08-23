var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
    description: { type: String, default: (Date.now).toString()},
    createdAt: { type: Date, default: Date.now },
    startTime: Date,
    endTime: Date,
    duration: Number

});

//Should add project id

module.exports = mongoose.model("Task", taskSchema);