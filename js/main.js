// -----------------------------------------------------------------------------
// DEFS
// -----------------------------------------------------------------------------
var GREEN1   = "1ABC9C",
    GREEN2   = "16A085",
    GREEN3   = "2ECC71",
    GREEN4   = "27AE60",
    BLUE1    = "3498DB",
    BLUE2    = "2980B9",
    BLUE3    = "34495E",
    BLUE4    = "2C3E50",
    PURPLE1  = "9B59B6",
    PURPLE2  = "8E44AD",
    YELLOW1  = "F1C40F",
    ORANGE1  = "F39C12",
    ORANGE2  = "E67E22",
    ORANGE3  = "D35400",
    RED1     = "E74C3C",
    RED2     = "C0392B",
    GRAY1    = "ECF0F1",
    GRAY2    = "BDC3C7",
    GRAY3    = "95A5A6",
    GRAY4    = "7F8C8D";
// -----------------------------------------------------------------------------
// Game module
// -----------------------------------------------------------------------------

var defaults = {
    slotHeight      : 70,
    slotWidth       : 70,
    borderColor     : YELLOW1,
    fontSizeFactor  : 0.5,
    groupsNum       : 3,
    groupTitle      : "Grupa",
    gameTitle       : "Losowanie",
    gamesNum        : 3,
    numsNum         : 5,
    min             : 1,
    max             : 100,
    minRolls        : 1,
    maxRolls        : 2,
    minTime         : 3,
    maxTime         : 5,
    gameWidth       : 1000,
    changeAnimSpeed : 500,
    numberMargin    : 10
};

$("#slot-height")       .val( defaults.slotHeight      );
$("#slot-width")        .val( defaults.slotWidth       );
$("#border-color")      .val( defaults.borderColor     );
$("#font-size-factor")  .val( defaults.fontSizeFactor  );
$("#groups-num")        .val( defaults.groupsNum       );
$("#group-title")       .val( defaults.groupTitle      );
$("#game-title")        .val( defaults.gameTitle       );
$("#games-num")         .val( defaults.gamesNum        );
$("#nums-num")          .val( defaults.numsNum         );
$("#min")               .val( defaults.min             );
$("#max")               .val( defaults.max             );
$("#min-rolls")         .val( defaults.minRolls        );
$("#max-rolls")         .val( defaults.maxRolls        );
$("#min-time")          .val( defaults.minTime         );
$("#max-time")          .val( defaults.maxTime         );
$("#game-width")        .val( defaults.gameWidth       );
$("#change-anim-speed") .val( defaults.changeAnimSpeed );
$("#number-margin")     .val( defaults.numberMargin    );


$("#generate").click(function(e){

    e.preventDefault();

    $(".results").children().each(function(){
        $(this).remove();
    });

    LotteryGames.getGameResults({
        gameResultsTpl : $("#results-wrapper-template"),
        groupResultsTpl : $("#group-results-template"),
        numberResultTpl : $("#number-result-template"),
        groupTitle      : $("#group-title").val(),
        gameTitle       : $("#game-title").val(),
        min             : parseInt(  $("#min").val()        , 10),
        max             : parseInt(  $("#max").val()        , 10),
        groupsNum       : parseInt(  $("#groups-num").val() , 10),
        gamesNum        : parseInt(  $("#games-num").val()  , 10),
        numsNum         : parseInt(  $("#nums-num").val()   , 10),
    });

});

$("#reload").click(function(e){

    e.preventDefault();

    $(".game-wrapper").children().each(function(){
        $(this).remove();
    });

    LotteryGames.init({
    // -------------------------------------------------------------------------
    // Wrappers
    // -------------------------------------------------------------------------
        gameTemplate    : $("#game-template"),
        groupTemplate   : $("#group-template"),
        numberTemplate  : $("#number-template"),
        slotTemplate    : $("#slot-template"),
        gamesWrapper    : $("#games-wrapper"),
        optionsElement  : $(".main-options"),
        parent          : $("body"),
    // -------------------------------------------------------------------------
    // Game options
    // -------------------------------------------------------------------------
        fontSizeFactor  : $("#font-size-factor").val(),
        groupTitle      : $("#group-title").val(),
        gameTitle       : $("#game-title").val(),
        borderColor     : $("#border-color").val(),
        slotHeight      : parseInt(  $("#slot-height").val()        ,10),
        slotWidth       : parseInt(  $("#slot-width").val()         ,10),
        groupsNum       : parseInt(  $("#groups-num").val()         ,10),
        gamesNum        : parseInt(  $("#games-num").val()          ,10),
        numsNum         : parseInt(  $("#nums-num").val()           ,10),
        min             : parseInt(  $("#min").val()                ,10),
        max             : parseInt(  $("#max").val()                ,10),
        minRolls        : parseInt(  $("#min-rolls").val()          ,10),
        maxRolls        : parseInt(  $("#max-rolls").val()          ,10),
        minTime         : parseInt(  $("#min-time").val()           ,10),
        maxTime         : parseInt(  $("#max-time").val()           ,10),
        gameWidth       : parseInt(  $("#game-width").val()         ,10),
        changeAnimSpeed : parseInt(  $("#change-anim-speed").val()  ,10),
        numberMargin    : parseInt(  $("#number-margin").val()      ,10)
    });

});


// -----------------------------------------------------------------------------
// Misc
// -----------------------------------------------------------------------------

var next = -1, prev = 1;

var optionsEnabled    = true,
    leftArrow         = String.fromCharCode(37),
    rightArrow        = String.fromCharCode(39);

if(!this.optionsEnabled) {
    $('.options').css("top", "-100%");
}

var showOptions = function() {

    var delay = 333;
    var elie = $(".options");
    var outerHeight = elie.outerHeight();
        outerHeight += 100;

    if(optionsEnabled) {
        $('.options').animate({
            top: "-"+outerHeight+"px"
          }, delay
        );
        optionsEnabled = false;
    } else {
        $('.options').animate({
            top: 0
          }, delay
        );
        optionsEnabled = true;
    }

};

// -----------------------------------------------------------------------------
// Key bindings
// -----------------------------------------------------------------------------
$(document).bind('keyup', function(event) {

    var c = String.fromCharCode(event.keyCode);

    switch(c) {

        case "O":
            showOptions();
            break;

        case "S":
            LotteryGames.start();
            break;

        case leftArrow:
            LotteryGames.changeGame( prev );
            break;

        case rightArrow:
            LotteryGames.changeGame( next );
            break;

    }

});
