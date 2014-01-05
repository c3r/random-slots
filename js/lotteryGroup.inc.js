// -----------------------------------------------------------------------------
// LotteryGroup definition
// -----------------------------------------------------------------------------
var LotteryGroup = (function() {
    'use strict';

    function LotteryGroup( options ) {
        if (!(this instanceof LotteryGroup)) {
            return new LotteryGroup(args);
        }

        this.size = 0;
        this.id = options.id || 0;
        this.name = options.name || "Grupa";
        this.numbers = [];
        this.element = options.element || null;
    }

    LotteryGroup.prototype.getSize = function() {
        return numbers.length;
    }

    LotteryGroup.prototype.addNum = function(aNum) {
        this.numbers[this.size++] = aNum;
    }

    LotteryGroup.prototype.appendTo = function(parent) {
        for (var i = this.numbers.length - 1; i >= 0; i--) {
            this.numbers[i].appendTo(this.element);
        }
        this.element.appendTo(parent);
    }

    return LotteryGroup;

}());