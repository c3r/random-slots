// Start module

LotteryGames.start({
		gameTemplate	 : $("#game-template"),
		groupTemplate  : $("#group-template"),
		numberTemplate : $("#number-template"),
		slotTemplate 	 : $("#slot-template"),
		slotHeight		 : 50,
		slotWidth		   : 50,
		fontSizeFactor : 0.7,
		groupsNum			 : 2,
		groupTitle		 : "Sekcja",
		gameTitle			 : "Losowanie",
		gamesNum			 : 1,
		numsNum				 : 1,
		parent				 : $("body"),
		min            : 1,
		max            : 100
});