var express = require("express"),
     app = express(),
     bodyParser = require("body-parser"),
     mongoose = require("mongoose"),
     Toursite = require("./models/toursites"),
     seedDB = require("./seeds"),
     Comment = require("./models/comment"),
     passport = require("passport"),
     LocalStrategy = require("passport-local"),
     methodOverride = require("method-override"),
     User = require("./models/user"),
     flash = require("connect-flash");
     
     
var commentRoutes = require("./routes/comments"),
    toursitesRoutes = require("./routes/toursites"),
    indexRoutes = require("./routes/index");


//seedDB(); //Seeding the database
mongoose.connect("mongodb://localhost/travel_nigeria_v8");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"Mothers maiden name is amadi",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Toursite.create({name:"Isaac Boro Park", img:"http://afrotourism.com/wp-content/uploads/2015/06/IsaacBoroGardenPark1.jpg"}, function(err,toursites){
//     if(err){
//         console.log(err);
        
//     } else{
//         console.log(toursites);
//          }
// });


app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/toursites", toursitesRoutes);
app.use("/toursites/:id/comments", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Travelnigeria's Server just started!!");
    
});