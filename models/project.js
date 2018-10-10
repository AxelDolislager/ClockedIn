var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
   projectName: String,
   projectDescription: {type: String, default: "No description has been added to this project."},
   totalTimeSpend: {type: Number, default: 0},
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   tasks: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Task"
      }
   ]
});

module.exports = mongoose.model("Project", projectSchema);