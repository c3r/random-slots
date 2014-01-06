// -----------------------------------------------------------------------------
// LotteryNumber definition
// -----------------------------------------------------------------------------
var LotteryNumber = (function() {

    'use strict';

	var intValue;

	function zeroFill(number, width) {
	  	width -= number.toString().length;
	  	if ( width > 0 ) {
	    	return new Array(width+(/\./.test(number)?2:1) ).join('0')+number;
		}
	  	return number + "";
	}

    function LotteryNumber( options ) {
        if (!(this instanceof LotteryNumber)) {
            return new LotteryNumber(number);
        }

        this.id = options.id || 0;
        this.slots = [];
        this.max = options.max;
        this.borderColor = options.borderColor || '000000';
        this.value = zeroFill(options.value, this.max.toString().length);
        this.element = options.element || null;

        var borderWidth = (options.slotOptions.height +
                                options.slotOptions.height) / 2;
            borderWidth *= 0.12;

        this.element.css("border-color", "#" + options.borderColor)
                    .css("border-width", borderWidth + "px")
                    .css("border-style", "solid")
                    .css("margin", "1em");

        // console.log(this.id + ": " + this.value);

        for(var i=0; i<this.max.toString().length; i++) {
            var slotVal = this.value.toString()[i];
            this.slots[i] = new LotterySlot( slotVal,
                                             options.slotOptions,
                                             options.slotOptions
                                                    .template
                                                    .clone()
                                                    .removeAttr("id") );
        }

    }

    LotteryNumber.prototype.appendTo = function(parent) {
        for (var i=0; i<this.slots.length; i++) {
            // console.log("this.slots[i].appendTo(this.element)");
            this.slots[i].appendTo(this.element);
        }
        this.element.appendTo(parent);
    }

    LotteryNumber.prototype.animate = function() {
        for (var i = this.slots.length - 1; i >= 0; i--) {
            this.slots[i].spin();
        };
    }

    return LotteryNumber;

}());
