// -----------------------------------------------------------------------------
// LotteryGame definition
// -----------------------------------------------------------------------------

var LotteryGame = (function() {

    'use strict';

    // function arrayHasOwnIndex(array, prop) {
    //     return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
    // }

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
        for (var key in this.groups) {
            if (this.groups.hasOwnProperty(key)) {
                this.groups[key].appendTo(this.element);
            }
        }
        this.element.appendTo(parent);
    }

    LotteryGame.prototype.start = function() {
        for (var key in this.groups) {
            if (this.groups.hasOwnProperty(key)) {
                console.log(key);
                this.groups[key].animate();
            }
        }
    }

    return LotteryGame;

}());