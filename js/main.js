// -----------------------------------------------------------------------------
// DEFS
// -----------------------------------------------------------------------------
var GREEN1	 = '1ABC9C';
	GREEN2	 = '16A085',
	GREEN3	 = '2ECC71',
	GREEN4	 = '27AE60',
	BLUE1	 = '3498DB',
	BLUE2	 = '2980B9',
	BLUE3	 = '34495E',
	BLUE4	 = '2C3E50',
	PURPLE1	 = '9B59B6',
	PURPLE2	 = '8E44AD',
	YELLOW1	 = 'F1C40F',
	ORANGE1	 = 'F39C12',
	ORANGE2	 = 'E67E22',
	ORANGE3	 = 'D35400',
	RED1	 = 'E74C3C',
	RED2	 = 'C0392B',
	GRAY1	 = 'ECF0F1',
	GRAY2	 = 'BDC3C7',
	GRAY3	 = '95A5A6',
	GRAY4	 = '7F8C8D';
// -----------------------------------------------------------------------------
// Game module
// -----------------------------------------------------------------------------
LotteryGames.init({
	gameTemplate   	: $("#game-template"),
	groupTemplate  	: $("#group-template"),
	numberTemplate 	: $("#number-template"),
	slotTemplate   	: $("#slot-template"),
	gamesWrapper	: $("#games-wrapper"),
	slotHeight	   	: 70,
	slotWidth	   	: 70,
	borderColor		: YELLOW1,
	fontSizeFactor 	: 0.5,
	groupsNum	   	: 3,
	groupTitle	   	: "Sekcja",
	gameTitle	   	: "Paulinkowa gierka",
	gamesNum	   	: 5,
	numsNum		   	: 5,
	parent		   	: $("body"),
	min            	: 1,
	max            	: 100,
	minRolls	   	: 1,
	maxRolls	   	: 2,
	minTime   		: 3,
	maxTime    		: 5,
	gameWidth		: 1900
});
// -----------------------------------------------------------------------------
// Misc
// -----------------------------------------------------------------------------

var next = -1, prev = 1;

var optionsEnabled    = true,
 	leftArrow         = String.fromCharCode(37),
 	rightArrow        = String.fromCharCode(39);

if(!this.optionsEnabled) {
	$('.options').css("top", "-100%");
};

var showOptions = function() {

	var delay = 333;

	if(optionsEnabled) {
		$('.options').animate({
		    top: "-100%"
		  }, delay
		);
		optionsEnabled = false;
	} else {
		$('.options').animate({
		    top: 0
		  }, delay
		);
		optionsEnabled = true;
	}

}

// -----------------------------------------------------------------------------
// Key bindings
// -----------------------------------------------------------------------------
$(document).bind('keyup', function(event) {

	var c = String.fromCharCode(event.keyCode);

	switch(c) {

		case "O":
			showOptions();
			break;

		case "S":
			LotteryGames.start();
			break;

		case leftArrow:
			LotteryGames.changeGame( prev );
			break;

		case rightArrow:
			LotteryGames.changeGame( next );
			break;

	}

});
