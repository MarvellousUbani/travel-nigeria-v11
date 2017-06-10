var mongoose = require("mongoose");
var Toursite = require("./models/toursites");
var Comment = require("./models/comment");

var data = [
    {name:"Bar Beach", img:"http://www.visitnewcastle.com.au/images/operators/bar-beach/barbeacha.jpg", desc:"The Bar Beach was a beach on the Atlantic Ocean along the shorelines of Lagos and situated at Victoria Island. It is the most popular beach in Nigeria."},
    {name:"Amusement Park", img:"http://ecx.images-amazon.com/images/I/91aVIloCwgL._SL1500_.jpg",desc:"Some years ago, the Apapa Amusement Park used to be the number one leisure spot for family entertainment. Families trooped to the leisure ..."}
    ,{name:"Film House Africa", img:"https://media.licdn.com/mpr/mpr/shrinknp_800_800/AAEAAQAAAAAAAAbXAAAAJDk0ZjUyMTFlLTQxM2YtNDI1Mi04OWIwLTE2NWM0MTZkNDM5NA.jpg", desc:"Most of us watch movies in boring, stock-standard movie theaters, but that's not how it has to be. These cool cinemas will show you just how much more ..."}
    ];


function seedDB(){
    //Remove all toursites
    Toursite.remove({}, function(err){
    if(err){
      console.log(err); 
    }
          //add some toursites
    data.forEach(function(seed){
        Toursite.create(seed, function(err,toursite){
            if(err){
                console.log(err);
            }
            else{
                console.log("added a toursite");
                //create a comment
                Comment.create({text:"Thanks, these suggestions are really amazing!!", author:"Marvellous Ubani"}, function(err, comment){
                    if(err){
                        console.log(err);
                    }
                    else{
                        toursite.comments.push(comment);
                        toursite.save();
                        console.log("Added a comment");
                    }
                });
            }
        });
    });
    });
    
  
    
    
    //add some comments
}


module.exports = seedDB; 