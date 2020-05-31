// set current date to display at top of calendar
var currentDayText = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDayText);

// create object to hold time block data
var timeBlocks = {};


// load data from local storage and fill in applicable time blocks
var loadBlocks = function () {
    timeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));

    // create key's in time block object if empty
    if (!timeBlocks) {
        timeBlocks = {
            "9": [],
            "10": [],
            "11": [],
            "12": [],
            "13": [],
            "14": [],
            "15": [],
            "16": [],
            "17": []
        };
    }
    
    // loop through timeBlocks object and write values to corresponding time blocks
    $.each(timeBlocks, function(blockNumber, blockText) {
        var timeBlock = $("#" + blockNumber);
        $(timeBlock).text(blockText);
    });
};

// dynamically style time blocks according to current hour
var timeChecker = function () {
    // get current hour
    var currentHour = moment().hour();
    console.log("checked time");

    // get all text areas
    var timeBlocks = $("textarea");

    // check each text area id against current hour and style accordingly
    $.each(timeBlocks, function(i, block) {
        var blockId = $(block).attr("id");

        if (blockId > currentHour) {
            $(block).removeClass("past");
            $(block).removeClass("present");
            $(block).addClass("future");
        }
        
        if (blockId == currentHour) {
            $(block).removeClass("future");
            $(block).removeClass("past");
            $(block).addClass("present");
        }

        if (blockId < currentHour) {
            $(block).removeClass("future");
            $(block).removeClass("present");
            $(block).addClass("past");
        }
    })
};

// function to run timeCheck every five minutes
var timeCheckTimer = function () {
    setInterval(timeChecker, 1000 * 60 * 5);
};

// save data in time block array to local storage
var saveBlocks = function () {
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
};

$(".saveBtn").on("click", function () {
    var timeBlock = $(this).attr("id").replace("btn", "");
    var currentText = $(this).closest(".time-block").find("textarea").val().trim();
    
    // save entered text to corresponding key in timeBlocks object
    timeBlocks[timeBlock] = currentText;
    saveBlocks();
    console.log(timeBlocks);
})

timeChecker();
timeCheckTimer();
loadBlocks();

