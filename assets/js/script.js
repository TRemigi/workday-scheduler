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
    // NEED TO LOOP THROUGH KEY VALUES AND WRITE TO TEXT AREA WITH CORRESPONDING ID NUMBER
    $.each(timeBlocks, function(blockNumber, blockText) {
        var timeBlock = $("#" + blockNumber);
        $(timeBlock).text(blockText);
        console.log(timeBlock);
    });
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

loadBlocks();
