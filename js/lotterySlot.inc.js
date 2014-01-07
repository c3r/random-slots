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
        this.rollingTime = getRandFrom(options.minTime, options.maxTime);
        this.sliderClass = options.sliderClass || ".slider";
        this.fontSize = options.fontSize;
        this.value = value;
        this.panelCount = 10;

        this.radius = Math.round( (this.height / 2) /
                                    Math.tan( Math.PI / this.panelCount ) );

        this.delta = 360 / this.panelCount;

        this.element = elem;

        var aCss = {
            'height'      : this.height,
            'line-height' : this.height + 'px',
            'width'       : this.width,
            'font-size'   : this.fontSize + 'px'
        }

        this.element.css( aCss );
        this.element.find(".container-wrapper").css( aCss );
        this.element.find(".container").css( aCss );
        this.element.find(".carousel").css({
            '-webkit-transition': '-webkit-transform ' + this.rollingTime + 's',
               '-moz-transition': '-moz-transform ' + this.rollingTime + 's',
                 '-o-transition': '-o-transform ' + this.rollingTime + 's',
                    'transition': 'transform ' + this.rollingTime + 's',
        });

        var _radius = this.radius,
            _delta = this.delta,
            i = 0;

        this.element.find("figure").each(function(){
            $(this).css(aCss);
            $(this).css({
            '-webkit-transform': 'rotateX(' + i * _delta + 'deg) translateZ(' + _radius + 'px)',
               '-moz-transform': 'rotateX(' + i * _delta + 'deg) translateZ(' + _radius + 'px)',
                '-ms-transform': 'rotateX(' + i * _delta + 'deg) translateZ(' + _radius + 'px)',
                 '-o-transform': 'rotateX(' + i * _delta + 'deg) translateZ(' + _radius + 'px)',
                    'transform': 'rotateX(' + i * _delta + 'deg) translateZ(' + _radius + 'px)',
            });
            i++;
        });
        // console.log(this);
    }

    LotterySlot.prototype.spin = function() {

        var angle = -1 * 360 * this.rolls - (this.delta * this.value);

        this.element.find(".carousel").css({
             '-webkit-transform': 'rotateX(' + angle + 'deg) translateZ(0px)',
                '-moz-transform': 'rotateX(' + angle + 'deg) translateZ(0px)',
                 '-ms-transform': 'rotateX(' + angle + 'deg) translateZ(0px)',
                  '-o-transform': 'rotateX(' + angle + 'deg) translateZ(0px)',
                     'transform': 'rotateX(' + angle + 'deg) translateZ(0px)'
        });

    };

    LotterySlot.prototype.appendTo = function(parent) {
    	this.element.appendTo(parent);
    }

    return LotterySlot;

}());