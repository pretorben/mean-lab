var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose= require("./db/connection");

var app     = express();

var Job = mongoose.model("Job");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

app.get("/", function(req, res){
  res.render("jobs");
});

app.get("/api/jobs", function(req, res){
  Job.find({}).then(function(jobs){
    res.json(jobs)
  });
});

app.get("/api/jobs/:title", function(req, res){
  Job.findOne({title: req.params.title}).then(function(job){
    res.json(job);
  });
});

app.post("/api/jobs", function(req, res){
  Job.create(req.body).then(function(job){
    res.json(job);
  });
});

app.delete("/api/jobs/:title/delete", function(req, res){
  Job.findOneAndRemove({title: req.params.name}).then(function(){
    res.json({success: true})
  });
});

app.put("/api/jobs/:title", function(req, res){
  Job.findOneAndUpdate({title: req.params.name}, req.body.job, {new: true}).then(function(candidate){
    res.json(job);
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
