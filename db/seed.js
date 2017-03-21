var mongoose  = require("./connection");
var seedData  = require("./seeds");

var Job = mongoose.model("Job");

Job.remove({}).then(function(){
  Job.collection.insert(seedData).then(function(){
    process.exit();
  });
});
