$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyAzWdNRGQWGgNg2Ch2S7Zf2z1blsemh5JE",
        authDomain: "train-scheduler-d0f87.firebaseapp.com",
        databaseURL: "https://train-scheduler-d0f87.firebaseio.com",
        projectId: "train-scheduler-d0f87",
        storageBucket: "train-scheduler-d0f87.appspot.com",
    }; // end firebase config

    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = '';
    var destination = '';
    var firstTrainTime = 0;
    var frequency = 0;
    var timeStamp = 0;

    $('#add-train').on('click', function(event) {
        event.preventDefault();

        trainName = $('#train-name').val().trim();
        destination = $('#destination').val().trim();
        firstTrainTime = $('#first-train-time').val();
        frequency = $('#frequency').val().trim();
        timeStamp = firebase.database.ServerValue.TIMESTAMP;

        database.ref().push({
            trainName: trainName,
            desition: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            timestamp: timeStamp
        }); // end database push

    $('#train-name').val('');
    $('#destination').val('');
    $('#first-train-time').val('');
    $('#frequency').val('');

    }); // end add train click

    database.ref().on('child_added', function(childSnapshot) {
    }); 

    database.ref().orderByChild('dateAdded').limitToLast(50).on('child_added', function(snapshot) {
        var sv = snapshot.val();

        var firstTimeConverted = moment(sv.firstTrainTime, 'hh:mm');
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
        var tRemainder = diffTime % sv.frequency;
        var tMinutesTillTrain = sv.frequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, 'minutes');

        $('#tbody').append('<tr><td>' + sv.trainName + '</td><td>' + sv.desition + '</td><td>' + sv.frequency + '</td><td>' + moment(nextTrain).format('hh:mm') + '<td>' + tMinutesTillTrain + '</td></td></tr>');
    }); // end database orderByChild

}); // end document ready






