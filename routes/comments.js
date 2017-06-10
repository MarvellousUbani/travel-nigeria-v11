var express = require("express");
var router = express.Router({mergeParams:true});
var Toursite = require("../models/toursites");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENT ROUTES

router.get("/new", middleware.isLoggedIn, function(req, res){
    //find the toursite by id
    Toursite.findById(req.params.id, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            //display the comments new page
             res.render("comments/new", {toursite:data});
        }
    });
    
});


router.post("/", middleware.isLoggedIn, function(req, res){
    //Get toursite by ID
    Toursite.findById(req.params.id, function(err, toursite){
        if(err){
            console.log(err);
            res.redirect("/toursites");
        }
        else{
            var text = req.body.text;
            var author = req.body.author;
            var newComment = {text:text, author:author};

            Comment.create(newComment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               
               comment.save();
               
               toursite.comments.push(comment);
               toursite.save();
               req.flash("success", "Your comment has been added");
               res.redirect('/toursites/' + toursite._id);
           }
        });
        }
    });
    //create new comment
    //connect new comment to toursite
    //redirect to toursite show page
});

//Comments Edit Route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            res.redirect("back")
        }
        else{
            res.render("comments/edit", {comment:comment, toursiteId:req.params.id});
        }
    })
});

//Comments Update Route

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    var text = req.body.text;
    var bodyText = {text:text};

   Comment.findByIdAndUpdate(req.params.comment_id, bodyText, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          req.flash("success", "You just added a new comment")
          res.redirect("/toursites/" + req.params.id );
      }
   });
});

// router.put("/:comment_id", function(req, res){
   
//     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
//         if(err){
//             res.redirect("back");
//             console.log(req.body.comment);
          
//         }
//         else{
//             res.redirect("/toursites/"+req.params.id);
//         }
//     });
// });


//Comments Delete Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
         if(err){
           res.redirect("back");
       } 
       else{
           req.flash("success", "Your comment has been removed");
           res.redirect("/toursites/"+req.params.id);
       }
    });
});







module.exports = router;