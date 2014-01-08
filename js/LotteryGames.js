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
		numbersGenerated: false,

		init: function( options ) {

			if(!this.numbersGenerated) {
				console.log("Numbers not generated yet!");
				return;
			}

			this.currentGameId = 0;
			this.games = [];

			var gameOptions, groupOptions, numOptions, game, group, number;

			this.gameWidth = options.gameWidth || 980;
			this.changeAnimSpeed = options.changeAnimSpeed || 1000;
			this.optionsElement = options.optionsElement;

			$("#slot-height").val(options.slotHeight);
			$("#slot-width").val(options.slotWidth);
			$("#border-color").val(options.borderColor);
			$("#font-size-factor").val(options.fontSizeFactor);
			$("#groups-num").val(options.groupsNum);
			$("#group-title").val(options.groupTitle);
			$("#game-title").val(options.gameTitle);
			$("#games-num").val(options.gamesNum);
			$("#nums-num").val(options.numsNum);
			$("#min").val(options.min);
			$("#max").val(options.max);
			$("#min-rolls").val(options.minRolls);
			$("#max-rolls").val(options.maxRolls);
			$("#min-time").val(options.minTime);
			$("#max-time").val(options.maxTime);
			$("#game-width").val(options.gameWidth);
			$("#change-anim-speed").val(options.changeAnimSpeed);
			$("#number-margin").val(options.numberMargin);

			// Games generation -----------------------------------
			for(var i=0; i<options.gamesNum; i++) {
				this.games[i] = new LotteryGame({
					id        : i,
					groupsNum : options.groupNum || 1,
					width 	  : options.gameWidth || 980,
					title     : options.gameTitle + " " + (i+1) || "Losowanie",
					element   : this.cloneAndRemoveId( options.gameTemplate )
				});

				// Groups generation -----------------------------------
				for(var j=0; j<options.groupsNum; j++) {
					group = new LotteryGroup({
						id       : j,
						title    : options.groupTitle + " " + (j+1) || "Grupa",
						element  : this.cloneAndRemoveId( options.groupTemplate )
					});

					// Numbers generation -----------------------------------
					for(var k=0; k<options.numsNum; k++) {
						group.addNum( new LotteryNumber({
							id 			 : k,
		        			borderColor  : options.borderColor || "000000",
		        			//TODO: change this, get those number @ some arr or sth
		        			value        : parseInt( $("#num_" + i + "_" + j + "_" + k).find("input").val() ),
		        			element      : options.numberTemplate
		        								  .clone().removeAttr("id"),
		        			max 		 : options.max || 1000,
		        			margin  	 : options.numberMargin,
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

			for (var key in this.games) {
				if (this.games.hasOwnProperty(key)) {
					if(key != this.currentGameId) {
						this.games[key].element.css({
							opacity: "0"
						});
					}
				}
			}

			//------------------------------------------------------
			// console.log(this);
			//------------------------------------------------------
		},

		cloneAndRemoveId: function(elie) {
			return elie.clone().removeAttr("id");
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

		getGameResults: function(options) {

			var value;
			var gameResults, groupResults, numberResult;

			var gameResultsTpl = options.gameResultsTpl,
			 	groupResultsTpl = options.groupResultsTpl,
			 	numberResultTpl = options.numberResultTpl,
			 	gameTitle = options.gameTitle,
			 	groupTitle = options.groupTitle;

			for(var i=0; i<options.gamesNum; i++) {
				gameResults = this.cloneAndRemoveId( gameResultsTpl );
				for(var j=0; j<options.groupsNum; j++) {
					groupResults = this.cloneAndRemoveId( groupResultsTpl );
					for(var k=0; k<options.numsNum; k++) {
						numberResult = this.cloneAndRemoveId( numberResultTpl );
						value = getRand(options.min, options.max);
						numberResult.find("input").val( value );
						numberResult.attr("id", "num_"+i+"_"+j+"_"+k);
						numberResult.appendTo( groupResults );
					}
					groupResults.find("legend").text(groupTitle + " " + (j+1));
					groupResults.appendTo( gameResults );
				}
				gameResults.find("legend").first().text(gameTitle + " " + (i+1));
				gameResults.appendTo( $(".results") );
			}
			this.numbersGenerated = true;
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
