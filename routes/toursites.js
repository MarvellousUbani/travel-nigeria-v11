var express = require("express");
var router = express.Router();
var Toursite = require("../models/toursites");
var middleware = require("../middleware");

router.get("/", function(req, res){
    //Get all toursites from DB
    Toursite.find({}, function(err,allToursites){
        if(err){console.log(err);}
        else{
         res.render("tours/toursites", {toursites:allToursites, currentUser: req.user});
        }
    });
    
   
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("tours/new");
});

//Shows more info about one toursite
router.get("/:id", function(req,res){
    //Find toursite with a particular id
    Toursite.findById(req.params.id).populate("comments").exec(function(err,foundToursite){
        if(err){console.log(err);} 
        else{
            console.log(foundToursite);
            //Show the toursite with the show template
            res.render("tours/show", {toursite:foundToursite});
        }
    });
    
});

//Edit Route
router.get("/:id/edit", middleware.checkToursiteOwnership, function(req, res){
    
//is user logged in
//does user own the campground
//otherwise redirect
//if not, redirect
 
    Toursite.findById(req.params.id, function(err, foundToursite){
        if(err){
            res.redirect("/toursites");
        }
        else{
              res.render("tours/edit", {toursites:foundToursite});
        }
    });
    
   
});

//Update Route
router.put("/:id", middleware.checkToursiteOwnership, function(req, res){
    //find and update the toursite
    var name = req.body.name;
    var img  = req.body.img;
    var desc = req.body.desc;
    
    var newTourSite = {name:name, img:img, desc:desc};
    Toursite.findByIdAndUpdate(req.params.id, newTourSite, function(err, editedToursite){
        if(err){
            res.redirect("/toursites/edit");
        }
        else{
           
            res.redirect("/toursites/"+req.params.id);
        }
    });
});

//Destroy route
router.delete("/:id", middleware.checkToursiteOwnership, function(req, res){
    Toursite.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/toursites");
       } 
       else{
           res.redirect("/toursites");
       }
    });
});

//TOURSITE CREATE ROUTE

router.post("/", middleware.isLoggedIn, function(req, res){
    //push a new tour site into the toursites array
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    var author = {
        id:req.user._id,
        username: req.user.username
    }
    
    var newTourSite = {name : name , img : img, desc : desc, author:author};
    
   //Create a new campground and save to DB
    Toursite.create(newTourSite, function(err,toursites){
    if(err){
        console.log(err);
        
    } else{
          //redirect to the toursites page
            res.redirect("toursites");
         }
    });
   
  
});





module.exports = router;