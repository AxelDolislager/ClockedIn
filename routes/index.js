var express = require("express")
var router  = express.Router();
var middleware = require("../middleware")

//root route
router.get("/", function(req, res){
    res.redirect("login");
});

router.get("/feedback", middleware.isLoggedIn, function(req, res){
    res.render("feedback", {current_page: null});
});

router.get("/404", function(req, res){
    res.render("404");
});

module.exports = router;