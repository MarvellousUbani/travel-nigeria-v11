var express = require("express"),
router = express.Router(),
passport = require("passport"),
User = require("../models/user");

router.get("/", function(req, res){
    
    res.render("landing");
});






//AUTH ROUTES


router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/toursites");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {successRedirect:"/toursites", failureRedirect:"/login"}) ,function(req, res){
});

//logout logic
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/toursites");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect("/login");
}

module.exports = router;