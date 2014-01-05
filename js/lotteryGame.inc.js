// -----------------------------------------------------------------------------
// LotteryGame definition
// -----------------------------------------------------------------------------

var LotteryGame = (function() {

    'use strict';

    function LotteryGame( options ) {
        if (!(this instanceof LotteryGame)) {
            return new LotteryGame();
        }

        this.id = options.id || 0;
        this.size = 0;
		this.title = options.title || "TITLE";
		this.groupsNum = options.groupNum || 1;
        this.groups = [];
        this.element = options.element || null;
    }

    LotteryGame.prototype.addGroup = function(aGroup) {
        this.groups[this.size++] = aGroup;
    }

    LotteryGame.prototype.appendTo = function(parent) {
        for (var i = this.groups.length - 1; i >= 0; i--) {
            this.groups[i].appendTo(this.element);
        }
        this.element.appendTo(parent);
    }

    return LotteryGame;

}());