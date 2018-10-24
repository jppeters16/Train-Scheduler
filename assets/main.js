// Initialize Firebase
var config = {
  apiKey: "AIzaSyAt-zi_KeuWBs50ggFOEI0AM_CVnhrI1Ak",
  authDomain: "train-activity-65233.firebaseapp.com",
  databaseURL: "https://train-activity-65233.firebaseio.com",
  projectId: "train-activity-65233",
  storageBucket: "",
  messagingSenderId: "968813583487"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  // ?????????????????????????????????????????????????????
  event.preventDefault();

  //assigns the user's input to a variable
  var name = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var startTime = $("#start-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  //create local object for train data
  var newTrain = {
    name: name,
    destination: destination,
    startTime: startTime,
    frequency: frequency
  };
  //upload train data to the database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.startTime);
  console.log(newTrain.frequency);

  alert("Train Successfully Added");

  //empty the input areas
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().startTime;
    var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

//-------------------------------------------------------------------------------------
//tried changing the values to integers so that the remainder could be calculated but moment() returns "NaN"
// var trainStartInt = parseInt(trainStart);
// console.log("START INT: " + trainStartInt);

// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// var currentTimeInt = parseInt(currentTime);
// console.log("CURRENT INT: " + currentTimeInt);
//-------------------------------------------------------------------------------------
    //Collaborated with Tim Albrecht on this code syntax
    var trainDiff = moment().diff(moment.unix(trainStart), "minutes");     
    var trainRemainder = trainDiff % trainFrequency;                                     
    var minAway = trainFrequency - trainRemainder;                            
    var trainArrival = moment().add(minAway, "m").format("hh:mm A");

//-------------------------------------------------------------------------------------
    //tried to formate the time calculations using the in-class assignment from folder 21 of the firebase lecture.
    // var trainStartPretty = moment(trainStart, "hmm").format("HH:mm");
    // console.log("START TIME: " + trainStartPretty);

    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // // Difference between the times
    // var diffTime = moment.utc(moment(currentTime,"DD/MM/YYYY HH:mm:ss").diff(moment(trainStartPretty,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
    // //var diffTime = moment().diff(moment(trainStartPretty, "hmm"), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % trainFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var trainArrival = trainFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + trainArrival);

    // // Next Train
    // var minAway = moment().add(trainArrival, "minutes");

    // var minAway = trainArrival - currentTime;
    // console.log(minAway);
  //-------------------------------------------------------------------------------------

    // Create the new row
    var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(trainArrival),
    $("<td>").text(minAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
    //For some reason it adds a new row whenever the page is refreshed but only updates the arrival time with the current time
});
