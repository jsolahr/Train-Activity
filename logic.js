var config = {
    apiKey: "AIzaSyD8GNCTLy1269ZqTj95Lm-kry6Dg8fqf8A",
    authDomain: "j-sola.firebaseapp.com",
    databaseURL: "https://j-sola.firebaseio.com",
    storageBucket: "j-sola.appspot.com",
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-input").val().trim(),"HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      train: trainName,
      destination: trainDest,
      firstTrain: trainFirst,
      frequency: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    alert("Train was successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
     database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);


    var tFrequency = trainFreq;
    console.log(tFrequency);
   
   //   // Time is 3:30 AM
    var firstTime = "4:00pm";
   
   //   // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
       console.log(firstTimeConverted);
   
   // Current Time
       var currentTime = moment();
       console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
   
   //   Difference between the times
       var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
       console.log("DIFFERENCE IN TIME: " + diffTime);
   
   //   Time apart (remainder)
       var tRemainder = diffTime % tFrequency;
       console.log(tRemainder);
   
   //   Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
   
   //   // Next Train
       var minutesAway = moment().add(tMinutesTillTrain, "minutes");
       console.log("ARRIVAL TIME: " + moment(minutesAway).format("h:mm"));


    // Prettify the train start
    var trainStartPretty = moment.unix(minutesAway).format("LT");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(moment(minutesAway).format("h:mm")),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  

 