let gameScore=0;
let name = "";

//Create Game Timer
function countDown () {
    console.log("running countdown");
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
        timeleft=timeleft-1;
        document.getElementById("countdown").innerHTML = timeleft + " sec remaining";

        if (timeleft == 0 || $(".filled").length === 3){
            if ($(".filled").length === 3) {
                gameScore = (10 * timeleft);
                alert("Great Job! You have won $" + gameScore);
            }
            else {
                document.getElementById("countdown").innerHTML = "Game Over!";
            }
            clearInterval(downloadTimer);
            $("#boxes").empty();
            $("#colors").empty();

            //append player name and score to leaderboard
            name = $("#name").val();
            let playerhtml = '<tr><td>' + name + '</td><td>' + gameScore + '</td></tr>';
            $("#score").append(playerhtml);


            $("#leaderboard").show();
            gameScore = 0;
            console.log("hi");
            $("#name").val('');
        }
    }, 1000);
}

// Randomize boxes for drag and drop
function randomize(array) {
    return array.sort(function() {
        return 0.5 - Math.random();
    });
};

function createTargetBoxes(colors) {
    for (i = 0; i < colors.length; i++) {
        console.log(colors[i]);
        $("<div>", {
            text: colors[i].key
        })
        .appendTo("#boxes");
    }
}

function makeBoxesDroppable() {
    $("#boxes > div").droppable({
        accept: function(draggable) {
            return $(this).text() == draggable.attr("id");
        },
        drop: function(event, ui) {
            let color = ui.draggable.css("background-image");
            $(this).css("background-image", color).addClass("filled");
            ui.draggable.hide("puff");
        }
    });
}

//Create boxes for images
function createPictureBoxes(colors) {
    for (i=0; i < colors.length; i++) {
        $("<div>", { id: colors[i].key} )
        .css("background-image", "url(" + colors[i].url + ")")
        .appendTo("#colors")
        .draggable({
            revert: "invalid",
            zIndex: 2
        });
    }
}

    function Player(myName, myScore) {
        this.name = myName;
        this.gameScore = myScore;
    }



//Game
$(()=>{
    setGameTimeout();
});

function gameStarts() {
    $("#leaderboard").hide();

    var i = 0;
    var colors = randomize(
        [
            {url: 'images/art_lighthse.png',
             key: 'light house'},
            {url: 'images/art_maple.png',
             key: 'maple'},
            {url: 'images/artWindSculpture.png',
             key: 'wind sculpture'}
        ]
    );

    // myScoreBal.text = "Points: $" + gameScore;
    alert("Please enter your first name and select your dept.");

    createPictureBoxes(colors);

    randomize(colors);

    createTargetBoxes(colors);

    makeBoxesDroppable(colors);

    //Player(myName, myScoreBal);
};

function setGameTimeout (){
    $("#gameStarts").on('click', (ev) => {
        ev.preventDefault();
        gameStarts();
        countDown();
    });
}
