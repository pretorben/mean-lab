var mongoose  = require("mongoose");

var JobSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    location: String,
    poc: String
  }
);

mongoose.model("Job", JobSchema);
mongoose.connect("mongodb://localhost/jobboard");

module.exports = mongoose;
