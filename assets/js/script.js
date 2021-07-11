// Define variables.
var tiles = [];
var randomTiles = [];
var playBtn = $('#playButton');
var tileEl = $('.tile');
var tileZero;

function playGame() {

    console.log('playGame called.');
    playBtn.html('reshuffle!');

    tiles = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    randomTiles = [];

    // Randomize tiles.
    var j = 0;
    for (i = tiles.length; i > 0; i--) {

        shuffle = Math.floor(Math.random()*i);
        randomTiles[j] = tiles.splice(shuffle,1)[0];
        j++;

    }

    console.log(randomTiles);
    console.log(tileEl);
    
    // Assign IDs to tiles accordingly.
    for (i = 0; i < randomTiles.length; i++) {
        tileEl[i].id = 'tile'+randomTiles[i];
        tileEl[i].innerText = randomTiles[i];
        console.log(tileEl[i].innerText);
        tileString = '#tile'+i;
        console.log(tileString);
        $(tileString).addClass('tile');
        $(tileString).removeClass('blankTile');
    }

    // Remove "0" text from empty tile.
    $('#tile0').text('');
    $('#tile0').addClass('blankTile');


}

$('#tile0').addClass('blankTile');

// Listen for click on play button.
playBtn.on('click', function(event) {

    // Prevent screen reload.
    event.preventDefault();

    // Call function to begin game.
    playGame();

});