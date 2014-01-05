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

		start: function( options ) {

			var gameOptions, groupOptions, numOptions, game, group, number;

			// Games generation -----------------------------------
			for(var i=0; i<options.gamesNum; i++) {
				this.games[i] = new LotteryGame({
					id        : i,
					groupsNum : options.groupNum || 1,
					title     : options.gameTitle + " " + i || "Losowanie",
					element   : options.gameTemplate.clone().removeAttr("id")
				});
				// console.log("Dodano gre " + i);
				// console.log("i:"+i);
				// Groups generation -----------------------------------
				for(var j=0; j<options.groupsNum; j++) {
					group = new LotteryGroup({
						id       : j,
						name     : options.groupTitle + " " + j || "Grupa",
						element  : options.groupTemplate.clone().removeAttr("id")
					});
					// console.log("j:"+j);
					// Numbers generation -----------------------------------
					for(var k=0; k<options.numsNum; k++) {
						group.addNum( new LotteryNumber({
							id 			 : k,
		        			borderColor  : options.borderColor || "000000",
		        			value        : getRand(options.min, options.max) || 0,
		        			element      : options.numberTemplate.clone().removeAttr("id"),
		        			max 		 : options.max,
		        			slotOptions  : {
		        				id 			: k,
								height      : options.slotHeight || 100,
						        width       : options.slotWidth || 80,
						        sliderClass : options.sliderClass || ".slider",
						        value	    : options.value || 0,
						        fontSize    : options.fontSize || options.slotHeight * 0.7,
								template    : options.slotTemplate
		        			}
						}) );
						// console.log("Dodano numer " + k + " do grupy " + j + " do gry " + i);
						// console.log("k:"+k);
					}
					this.games[i].addGroup( group );
					// console.log("Dodano grupe " + j + ", do Gry " + i);
				}

				this.games[i].appendTo( $("body") );

			};

			for(var i=0; i<options.gamesNum; i++) {
				for(var j=0; j<options.groupsNum; j++) {
					for(var k=0; k<options.numsNum; k++) {
						// console.log(this.games[i]);
						// console.log(i+","+j+","+k);
						this.games[i].groups[j].numbers[k].animate();
					}
				}
			}

			if(!this.optionsEnabled) {
				$('.options').css("top", "-100%");
			};

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

			console.log(this);

		},
		enableOptions: function(enable) {
			optionsEnabled = enable;
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




