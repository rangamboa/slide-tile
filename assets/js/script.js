// Define variables.
var tiles = [];
var randomTiles = [];
var moves = [];
var tileGrid = $('#tileCard');
var playBtn = $('#playButton');
var tileEl = $('.tile');

function initGame() {

    console.log('initGame() called.');
    tileGrid.css('visibility', 'visible');
    playBtn.html('reshuffle');

    tiles = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    randomTiles = [];

    // Randomize tiles.
    var j = 0;
    for (i = tiles.length; i > 0; i--) {

        shuffle = Math.floor(Math.random()*i);
        randomTiles[j] = tiles.splice(shuffle,1)[0];
        j++;

    }
    
    // Assign IDs to tiles, then display or hide accordingly.
    for (i = 0; i < randomTiles.length; i++) {

        tileEl[i].id = 'tile'+randomTiles[i];
        tileEl[i].innerText = randomTiles[i];

        tileString = '#tile'+i;

        $(tileString).addClass('numTile');
        $(tileString).removeClass('blankTile');

    }

    // Remove "0" text and border from empty tile.
    $('#tile0').text('');
    $('#tile0').removeClass('numTile');
    $('#tile0').addClass('blankTile');

    console.log('Random tile arrangement: ' + randomTiles);

}

function checkMove(clickedTile) {

    console.log('\ncheckMove() called.');

    // Get position of tile.
    clickedPos = randomTiles.indexOf(clickedTile);
    // console.log(clickedTile + ' has been clicked, with a position of '+ clickedPos);

    // Generate array of possible moves for clicked position.
    moveList = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [5, 7]]
    
    // console.log(moveList[clickedPos]);
    // console.log(moveList[clickedPos].length);

    // Check each possible move.
    for (i = 0; i < moveList[clickedPos].length; i++) {

        move = moveList[clickedPos][i];
        // console.log(move);
        // console.log(randomTiles[move]);

        // Move tile and rewrite array for display if move is valid.
        if (randomTiles[move] == '0') {
            console.log('valid move into position ' + move);
            moveTile();
        }
        else {
            console.log('invalid move into position ' + move);
        }
    }
}

function moveTile() {
    
}

// Listen for click on any number tile.
tileEl.on('click', function(event) {

    // Extract number on tile.
    clickedTile = event.target.textContent;

    // Do nothing if the blank tile is checked; otherwise check if tile can move.
    if (clickedTile == 0) return;
    else checkMove(clickedTile);

});

// Listen for click on play button.
playBtn.on('click', function(event) {

    // Prevent screen reload.
    event.preventDefault();

    // Call function to begin game.
    initGame();

});