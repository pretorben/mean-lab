angular
  .module("jobboard", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Job", [
    "$resource",
    Job
  ])
  .controller("indexCtrl", [
    "$state",
    "Job",
    indexController
  ])
  .controller("showCtrl", [
    "$stateParams",
    "Job",
    showController
  ])

function Router($stateProvider) {
  $stateProvider
  .state("welcome", {
    url:"/",
    templateUrl:"/assets/js/ng-views/welcome.html"
  })
  .state("index", {
  url:"/jobs",
  templateUrl:"/assets/js/ng-views/index.html",
  controller: "indexCtrl",
  controllerAs: "vm"
})
  .state("show", {
    url:"/jobs/:title",
    templateUrl:"/assets/js/ng-views/show.html",
    controller: "showCtrl",
    controllerAs: "vm"
  })
}

function Job ($resource) {
  return $resource("/api/jobs/:title", {}, {
    update: { method: "PUT"}
  })
}

function indexController ($state, Job) {
  this.jobs = Job.query();
  this.newJob = new Job ()
  this.create = function () {
      this.newJob.$save().then(function(job){
        $state.go("show", {title: job.title})
  });
};
}

function showController ($stateParams, Job) {
  this.job = Job.get({title: $stateParams.title})
  this.update = function () {
    this.job.$update({title: $stateParams.title})
    };
  }
