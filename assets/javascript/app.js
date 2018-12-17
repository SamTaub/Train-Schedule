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
  var createTableData = $("<td>");

  var addTrain = createTableData.text(sv.train);
  var addDestination = createTableData.text(sv.destination);
  var addNextArrival = createTableData.text(sv.nextArrival);
  var addMinutesAway = createTableData.text(sv.minutesAway);
  var addFrequency = createTableData.text(sv.frequency);

  createTableRow.append(addTrain, addDestination, addNextArrival, addMinutesAway, addFrequency);

  $("tbody").append(createTableRow);


});