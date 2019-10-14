let gameScore=0;

//Create Game Timer
function countDown () {
    console.log("running countdown");
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
        timeleft=timeleft-1;
        document.getElementById("countdown").innerHTML = timeleft + " sec remaining";

        if (timeleft == 0 || $(".filled").length === 3){
            if ($(".filled").length === 3) {
                gameScore += 10;
                alert("Great Job! You have won a $10 voucher!");
            }
            else {
                document.getElementById("countdown").innerHTML = "Game Over!";
            }
            clearInterval(downloadTimer);
            $("#boxes").empty();
            $("#colors").empty();
            $("#leaderboard").show();
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
        this.gameScore = myScore;}

    // Create new players
    player1 = new Player("Tom", 50);
    player2 = new Player("Michael", 100);
    player3 = new Player("Lisa",10);
    player4 = new Player("Doreen",20);

    function displayLeaderboard() {
        let leaderboard = "";
        Players.sort((aPlayer, bPlayer) => aPlayer.gameScore - bPlayer.gameScore);
        Players.forEach((player) => leaderboard += '<tr><td>' + player.name + '</td><td>' + player.gameScore + '</td></tr>');
        document.getElementById("scoreBoard").aside = leaderboard;
        // document.getElementById("scoreBoard").aside.innerHTML = leaderboard;
    }

//Game
$(()=>{
    setGameTimeout();
});

function gameStarts() {
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

    createPictureBoxes(colors);

    randomize(colors);

    createTargetBoxes(colors);

    makeBoxesDroppable(colors);

    Player();
};

function setGameTimeout (){
    $("#gameStarts").on('click', (ev) => {
        ev.preventDefault();
        gameStarts();
        countDown();
    });
}
