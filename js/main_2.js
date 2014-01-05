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
// Lottery game definition
// -----------------------------------------------------------------------------
LotteryGame = Backbone.Model.extend({
	defaults: {
		title          : "TITLE",
		groupName      : "GROUP_NAME",
		lotteriesNum   : 3,
		groupsNum      : 3,
		maxNum         : 30,
		minNum         : 1,
		minSpins       : 2,
		maxSpins       : 20,
		saveResults    : false,
		noDuplicates   : true,
		slotHeight     : 100,
		slotWidth      : 100,
		lotteryMargins : 30,
		groupsMargins  : 30,
		color          : 'F1C40F',
		rollingSpeed   : 10
	}
});

// -----------------------------------------------------------------------------
// Lottery number definition
// -----------------------------------------------------------------------------
LotteryNumber = Backbone.Model.extend({
	defaults: {
		id: 0,
		length: 1,
		theValue: "0"
	},
	setValue: function(aValue) {
		var _value;
	  	width -= aValue.toString().length;
	  	if ( width > 0 ) {
	    	_value = Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
	  	}
		this.set({ value: _value + ""});
		this.set({ length: width });
	}
});

// -----------------------------------------------------------------------------
// Lottery number view definition
// -----------------------------------------------------------------------------
LotteryNumberView = Backbone.View.extend({
	initialize: function(){
	  	this.render();
	},
    render: function(){
        // Compile the template using underscore
        var template = _.template( $("#search_template").html(), {} );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});

// -----------------------------------------------------------------------------
// Implementation
// -----------------------------------------------------------------------------
var lotteryGame = new LotteryGame();


LotteryNumber = Backbone.Model.extend({
	initialize: function(){

	}
});

