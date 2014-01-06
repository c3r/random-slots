// -----------------------------------------------------------------------------
// LotterySlot
// -----------------------------------------------------------------------------
var LotterySlot = (function() {
    'use strict';

    var maxRollingSpeed = 10;

    var getRandFrom = function(min, max) {
        return Math.floor( Math.random() * (max - min + 1) ) + min;
    };

    function LotterySlot( value, options, elem ) {
        if (!(this instanceof LotterySlot)) {
            return new LotterySlot(args);
        }

        this.id = options.id || 0;
        this.height = options.height || 0;
        this.width = options.width || 0;
        this.speed = options.speed || 1;

        this.rolls = getRandFrom(options.minRolls, options.maxRolls);
        this.sliderClass = options.sliderClass || ".slider";
        this.fontSize = options.fontSize;

        this.value = value;

        this.element = elem;
        this.element.css("height", this.height);
        this.element.css("line-height", this.height + "px");
        this.element.css("width", this.width);
        this.element.css("font-size", this.fontSize + "px");

        this.rollFor = (this.rolls + this.value) * this.height;
        this.slider = this.element.find( ".slider" );

        var list = this.slider.find("ul");

        for(var i=0; i<this.rolls; i++) {
            list.clone().appendTo(this.slider);
        }
    }

    LotterySlot.prototype.spin = function() {
        this.slider.animate({
            top: "-=" + this.rollFor
          }, this.rollFor * this.speed, "easeInOutCirc"
        );
    };

    LotterySlot.prototype.appendTo = function(parent) {
    	this.element.appendTo(parent);
    }

    return LotterySlot;

}());