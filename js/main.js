	// DEFS --------------------------------------------------------------------
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

// Start module
LotteryGames.start({
	gameTemplate   	: $("#game-template"),
	groupTemplate  	: $("#group-template"),
	numberTemplate 	: $("#number-template"),
	slotTemplate   	: $("#slot-template"),
	slotHeight	   	: 80,
	slotWidth	   	: 50,
	borderColor		: YELLOW1,
	fontSizeFactor 	: 0.7,
	groupsNum	   	: 2,
	groupTitle	   	: "Sekcja",
	gameTitle	   	: "Losowanie",
	gamesNum	   	: 2,
	numsNum		   	: 3,
	parent		   	: $("body"),
	min            	: 1,
	max            	: 10000,
	minRolls	   	: 5,
	maxRolls	   	: 10
});



$(document).bind('keyup', function(event) {
	var c = String.fromCharCode(event.keyCode);
	var delay = 600;
	if(c == "O") {
		if(this.optionsEnabled) {
			$('.options').animate({
			    top: "-100%"
			  }, delay
			);
			this.optionsEnabled = false;
		} else {
			$('.options').animate({
			    top: 0
			  }, delay
			);
			this.optionsEnabled = true;
		}
	}
});

