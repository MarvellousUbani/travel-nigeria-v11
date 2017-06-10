var Toursite = require("../models/toursites");
var Comment = require("../models/comment")
var middlewareObj = {};

middlewareObj.checkToursiteOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    Toursite.findById(req.params.id, function(err, foundToursite){
        if(err){
            res.redirect("back");
        }
        else{
            if(foundToursite.author.id.equals(req.user._id)){
              next();
            }
            else{
                 res.redirect("back");
             }
        }
    });
  }
  
     else{
       res.redirect("back");
       }
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            if(foundComment.author.id.equals(req.user._id)){
              next();
            }
            else{
                 res.redirect("back");
             }
        }
    });
  }
  
     else{
       res.redirect("back");
       }
}




module.exports = middlewareObj;