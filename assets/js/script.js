// Define variables.
var tiles = [];
var randomTiles = [];
var moveList = [];
var tileGrid = $('#tileCard');
var playBtn = $('#playButton');
var tileEl = $('.tile');
var tempTile;
var tempTiles = [];

function initGame() {

    console.log('initGame() called.');
    tileGrid.css('visibility', 'visible');
    playBtn.html('reshuffle');

    // Set initial tile arrangement.
    tiles = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    randomTiles = [];

    // Randomize tiles.
    var j = 0;
    for (i = tiles.length; i > 0; i--) {

        shuffle = Math.floor(Math.random()*i);
        randomTiles[j] = tiles.splice(shuffle,1)[0];
        j++;

    }
    
    // Set winning tile arrangement.
    tiles = ['1', '2', '3', '4', '5', '6', '7', '8', '0'];

    console.log('Initial random tile arrangement: ' + randomTiles);

    // Call function to draw grid.
    drawTiles();
}

function drawTiles() {

    console.log('\ndrawTiles() called.');

    console.log(randomTiles);
    
    // Assign IDs to tiles, then display number if not zero, else hide.
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

    checkWin();

}

function checkMove(clickedTile) {

    console.log('\ncheckMove() called.');

    // Get position of tile.
    clickedPos = randomTiles.indexOf(clickedTile);
    // console.log(clickedTile + ' has been clicked, with a position of '+ clickedPos);

    // Generate array of possible moves for clicked position.
    moveList = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [5, 7]];
    
    // console.log(moveList[clickedPos]);
    // console.log(moveList[clickedPos].length);

    // Check each possible move.
    for (i = 0; i < moveList[clickedPos].length; i++) {

        move = moveList[clickedPos][i];
        // console.log(move);
        // console.log(randomTiles[move]);

        // Call moveTile function if move is valid.
        if (randomTiles[move] == '0') {
            console.log('valid move into position ' + move);
            moveTile();
        } else {
            console.log('invalid move into position ' + move);
        }
    }
}

function moveTile() {

    console.log('\nmoveTile() called.');

    console.log('position to move from: ' + clickedPos);
    console.log('position to move to: ' + move);

    tempTile = randomTiles[clickedPos];
    randomTiles[clickedPos] = randomTiles[move];
    randomTiles[move] = tempTile;
    
    // Redraw tiles.
    drawTiles();

}

function checkWin() {

    if (randomTiles == tiles) alert('you a win');    
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