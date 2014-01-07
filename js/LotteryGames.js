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

		games: [],
		currentGameId: 0,
		gameWidth: 0,
		changeAnimSpeed: 0,

		init: function( options ) {

			var gameOptions, groupOptions, numOptions, game, group, number;

			this.gameWidth = options.gameWidth || 980;
			this.changeAnimSpeed = options.changeAnimSpeed || 1000;

			// Games generation -----------------------------------
			for(var i=0; i<options.gamesNum; i++) {
				this.games[i] = new LotteryGame({
					id        : i,
					groupsNum : options.groupNum || 1,
					width 	  : options.gameWidth || 980,
					title     : options.gameTitle + " " + (i+1) || "Losowanie",
					element   : options.gameTemplate.clone().removeAttr("id")
				});

				// Groups generation -----------------------------------
				for(var j=0; j<options.groupsNum; j++) {
					group = new LotteryGroup({
						id       : j,
						title    : options.groupTitle + " " + (j+1) || "Grupa",
						element  : options.groupTemplate.clone().removeAttr("id")
					});

					// Numbers generation -----------------------------------
					for(var k=0; k<options.numsNum; k++) {
						group.addNum( new LotteryNumber({
							id 			 : k,
		        			borderColor  : options.borderColor || "000000",
		        			value        : getRand(options.min, options.max) || 0,
		        			element      : options.numberTemplate
		        								  .clone().removeAttr("id"),
		        			max 		 : options.max || 1000,
		        			slotOptions  : {
		        				id 			: k,
								height      : options.slotHeight || 100,
						        width       : options.slotWidth || 80,
						        minRolls	: options.minRolls || 1,
						        maxRolls	: options.maxRolls || 10,
						        minTime		: options.minTime || 1,
						        maxTime		: options.maxTime || 10,
						        sliderClass : options.sliderClass || ".slider",
						        fontSize    : options.slotHeight
						        					   * options.fontSizeFactor,
								template    : options.slotTemplate
		        			}
						}) );
					}
					this.games[i].addGroup( group );
				}
				this.games[i].appendTo( options.gamesWrapper );
			};



			//------------------------------------------------------
			console.log(this);
			//------------------------------------------------------


		},

		enableOptions: function(enable) {
			optionsEnabled = enable;
		},

		changeGame: function(direction) {
			var nextGameId = this.currentGameId - direction;
			if(nextGameId >= 0 && nextGameId < this.games.length) {
				this.currentGameId = nextGameId;
				for (var key in this.games) {
					if (this.games.hasOwnProperty(key)) {
						if(key == this.currentGameId) {
							this.games[key].element.animate({
								left : "+=" + (this.gameWidth * direction),
								opacity: 1
							}, this.changeAnimSpeed);
						} else {
							this.games[key].element.animate({
								left : "+=" + (this.gameWidth * direction),
								opacity : 0
							}, this.changeAnimSpeed);
						}
					}
				}
			} else {
				console.log("There's no game with id: " + nextGameId);
			}
		},

		start: function(id) {
			var game = this.games[ this.currentGameId ];
			if( !game.played ) {
				game.start();
				game.played = true;
			} else {
				console.log("This game was already played!");
			}
		},

	};

}());
