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

$("#submit").on("click", function () {

  event.preventDefault();

  
  var train = $("#formTrain").val().trim();
  var destination = $("#formDestination").val().trim();
  var nextArrival = moment($("#formFirstTrain").val().trim(), 'LT').format('X');
  var frequency = $("#formFrequency").val().trim();

  var trainTime = {
    train: train,
    destination: destination,
    nextArrival: nextArrival,
    frequency: frequency
  };

  database.ref().push(trainTime);

  $("#formTrain").val('');
  $("#formDestination").val('');
  $("#formFirstTrain").val('');
  $("#formFrequency").val('');

});

database.ref().on("child_added", function (snapshot) {

  var sv = snapshot.val();

  train = sv.train;
  destination = sv.destination;
  nextArrival = sv.nextArrival;
  frequency = sv.frequency;


  var trainDifference = moment().diff(moment.unix(sv.nextArrival), 'minutes');
  var timeRemainder = trainDifference % frequency;
  var minutesAway = frequency - timeRemainder;

  nextArrival = moment().add(minutesAway, 'm').format('h:mm a');

  var createRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(destination),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
    $("<td>").text(frequency),
  );



  $("tbody").append(createRow);

});

$("#current-time").text(moment().format("dddd, MMMM Do, YYYY h:mm a"));