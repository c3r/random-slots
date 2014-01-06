var LotteryGames = (function() {
	'use strict';

	var randomNumsCache = [];

	var getRand = function(min, max) {
		var ret = getRandFrom(min, max);
		while( inArray(randomNumsCache, ret) ) {
			ret = getRandFrom(min, max);
		}
		randomNumsCache[randomNumsCache.length] = ret;
		return ret;
	};

	var getRandFrom = function(min, max) {
		return Math.floor( Math.random() * (max - min + 1) ) + min;
	};

	var inArray = function(haystack, needle) {
		for (var i = haystack.length - 1; i >= 0; i--) {
			if(needle == haystack[i])
				return true;
			return false;
		};
	};

	return {

		optionsEnabled: false,
		games: [],

		init: function( options ) {

			var gameOptions, groupOptions, numOptions, game, group, number;
			// Games generation -----------------------------------
			for(var i=0; i<options.gamesNum; i++) {
				this.games[i] = new LotteryGame({
					id        : i,
					groupsNum : options.groupNum || 1,
					title     : options.gameTitle + " " + i || "Losowanie",
					element   : options.gameTemplate.clone().removeAttr("id")
				});
				// Groups generation -----------------------------------
				for(var j=0; j<options.groupsNum; j++) {
					group = new LotteryGroup({
						id       : j,
						name     : options.groupTitle + " " + j || "Grupa",
						element  : options.groupTemplate.clone().removeAttr("id")
					});
					// Numbers generation -----------------------------------
					for(var k=0; k<options.numsNum; k++) {
						group.addNum( new LotteryNumber({
							id 			 : k,
		        			borderColor  : options.borderColor || "000000",
		        			value        : getRand(options.min, options.max) || 0,
		        			element      : options.numberTemplate.clone().removeAttr("id"),
		        			max 		 : options.max || 1000,
		        			slotOptions  : {
		        				id 			: k,
								height      : options.slotHeight || 100,
						        width       : options.slotWidth || 80,
						        minRolls	: options.minRolls || 1,
						        maxRolls	: options.maxRolls || 10,
						        sliderClass : options.sliderClass || ".slider",
						        fontSize    : options.fontSize || options.slotHeight * 0.7,
								template    : options.slotTemplate
		        			}
						}) );
					}
					this.games[i].addGroup( group );
				}
				this.games[i].appendTo( $("body") );
			};

			if(!this.optionsEnabled) {
				$('.options').css("top", "-100%");
			};
			console.log(this);
		},
		enableOptions: function(enable) {
			optionsEnabled = enable;
		},
		start: function(gameId) {
			this.games[gameId].start();
		}
	};
}());

	// DEFS --------------------------------------------------------------------
	// var GREEN1	 = '1ABC9C';
	// 	GREEN2	 = '16A085',
	// 	GREEN3	 = '2ECC71',
	// 	GREEN4	 = '27AE60',
	// 	BLUE1	 = '3498DB',
	// 	BLUE2	 = '2980B9',
	// 	BLUE3	 = '34495E',
	// 	BLUE4	 = '2C3E50',
	// 	PURPLE1	 = '9B59B6',
	// 	PURPLE2	 = '8E44AD',
	// 	YELLOW1	 = 'F1C40F',
	// 	ORANGE1	 = 'F39C12',
	// 	ORANGE2	 = 'E67E22',
	// 	ORANGE3	 = 'D35400',
	// 	RED1	 = 'E74C3C',
	// 	RED2	 = 'C0392B',
	// 	GRAY1	 = 'ECF0F1',
	// 	GRAY2	 = 'BDC3C7',
	// 	GRAY3	 = '95A5A6',
	// 	GRAY4	 = '7F8C8D';
	// -------------------------------------------------------------------------




