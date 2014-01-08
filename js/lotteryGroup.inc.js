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
        this.title = options.title || "Grupa " + this.id;
        this.numbers = [];
        this.element = options.element || null;

        this.element.find("h1").text(this.title);

    }

    LotteryGroup.prototype.getSize = function() {
        return numbers.length;
    };

    LotteryGroup.prototype.addNum = function(aNum) {
        this.numbers[this.size++] = aNum;
    };

    LotteryGroup.prototype.appendTo = function(parent) {
        for (var key in this.numbers) {
            if (this.numbers.hasOwnProperty(key)) {
                this.numbers[key].appendTo(this.element);
            }
        }
        this.element.appendTo(parent);
    };

    LotteryGroup.prototype.animate = function() {
        for (var key in this.numbers) {
            if (this.numbers.hasOwnProperty(key)) {
                this.numbers[key].animate();
            }
        }
    };

    return LotteryGroup;

}());