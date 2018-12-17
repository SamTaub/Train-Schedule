// Initialize Firebase
var config = {
  apiKey: "AIzaSyALxjaeJ0Ii3ZdSmiMx3hR94oJ7kVPBOnU",
  authDomain: "train-schedule-58361.firebaseapp.com",
  databaseURL: "https://train-schedule-58361.firebaseio.com",
  projectId: "train-schedule-58361",
  storageBucket: "train-schedule-58361.appspot.com",
  messagingSenderId: "669043110510"
};

firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destination = "";
var nextArrival = "";
var minutesAway = 0;
var frequency = 0;




database.ref().on("child_added", function(snapshot){

  var sv = snapshot.val();

  var createTableRow = $("<tr>");

  var addTrain = $("<td>").text(sv.train);
  var addDestination =  $("<td>").text(sv.destination);
  var addNextArrival = $("<td>").text(sv.nextArrival);
  var addMinutesAway =  $("<td>").text(sv.minutesAway);
  var addFrequency =  $("<td>").text(sv.frequency);

  createTableRow.append(addTrain, addDestination, addNextArrival, addMinutesAway, addFrequency);

  $("tbody").append(createTableRow);

});

$("#submit").on("click", function(){

  event.preventDefault();

  train = $("#formTrain").val().trim();
  destination = $("#formDestination").val().trim();
  nextArrival = $("#formFirstTrain").val().trim();
  frequency = $("#formFrequency").val().trim();


  database.ref().push({
    train: train,
    destination: destination,
    nextArrival: nextArrival,
    frequency: frequency,
    minutesAway: "placeholder"

  });

});