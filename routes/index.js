var express = require("express")
var router  = express.Router();

//root route
router.get("/", function(req, res){
    res.redirect("login");
});

router.get("/404", function(req, res){
    res.render("404");
});

module.exports = router;