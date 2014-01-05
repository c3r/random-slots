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
        this.value = zeroFill(options.value, options.max.toString().length);
        this.element = options.element || null;

        for(var i=0; i<this.max.toString().length; i++) {
            this.slots[i] = new LotterySlot( options.slotOptions,
                                             options.slotOptions
                                                    .template
                                                    .clone()
                                                    .removeAttr("id") );
        }

    }

    LotteryNumber.prototype.appendTo = function(parent) {
        for (var i = this.slots.length - 1; i >= 0; i--) {
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
