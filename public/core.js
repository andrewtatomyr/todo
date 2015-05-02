var results= [], diff= [], accuracy= [];
var cookieExp= 10/24/60;

$(document).ready(function() {
  console.log("PAGE HAS LOADED");

  var urid= $.cookie("urid");
  if (urid/*==null*/) {
    console.log("COOKIE 'urid' HAS ALREADY SET AS "+urid);
    //$.cookie("urid", urid, { expires: cookieExp, path: '/'});
  } else {
    urid= Math.floor( Math.random()*(999999-100000+1) + 100000 );//100000;//Math.random(100000,999999);
    //$.cookie("urid", urid, { expires: cookieExp, path: '/'});
    console.log("COOKIE 'urid' SET AS "+urid);
  }
  $.cookie("urid", urid, { expires: cookieExp, path: '/'});

  var sum= 0; //there I should read dafa from the db

  var choiceAction= function(element) {

    $("#sticker").animate({
      top: -68
    });

    $('.buttons').fadeTo('fast', 1);

    $('.buttons').animate({
      height: 100
    });

    element.animate({
      height: 0
    });
    element.fadeTo('slow', 0);

    //console.log("CHOICE: "+element);
    /**
    for (var key in element) {
      console.log('* '+key+' => '+element[key]);
    }
    /**/
    $('#current-mood').addClass('mood-selected');

    $("#sticker").animate({
      top: -8
    });
  }

  if ($.cookie("my_mood")/*!=='undefined'*/) {
    var myMood= $.cookie("my_mood");
    console.log("MY MOOD: "+myMood);
    switch (myMood) {
      case "1": choiceAction($('#plus')); $('div#sticker').text(':)'); break;
      case "0": choiceAction($('#zero')); $('div#sticker').text(':|'); break;
      case "-1": choiceAction($('#minus')); $('div#sticker').text(':('); break;

    }


  } else { //??????????/
    //var myMood= 0;
  }

  $('.buttons').mouseenter(function() {
    $(this).addClass('accented');
  });

  $('.buttons').mouseleave(function() {
    $(this).removeClass('accented');
  });

  $('.main-text').mouseenter(function() {
    $(this).removeClass('shadowed-main-text');
    $(this).addClass('accented-main-text');
  });

  $('.main-text').mouseleave(function() {
    $(this).removeClass('accented-main-text');
    $(this).addClass('shadowed-main-text');
  });

  $('#plus').click(function() {
    choiceAction($(this));

    $('div#sticker').text(':)');
    $.cookie("my_mood", '1', { expires: cookieExp, path: '/'});
    console.log("CHOICE: "+$.cookie("my_mood"));

    sum+=1; //and there I should write data to the db
    $('span#world-happiness').text(sum);

  });

  $('#zero').click(function() {
    choiceAction($(this));

    $('div#sticker').text(':|');
    $.cookie("my_mood", '0', { expires: cookieExp, path: '/'});
    console.log("CHOICE: "+$.cookie("my_mood"));

    //$('span#world-happiness').text(sum);

  });

  $('#minus').click(function() {
    choiceAction($(this));

    $('div#sticker').text(':(');
    $.cookie("my_mood", '-1', { expires: cookieExp, path: '/'});
    console.log("CHOICE: "+$.cookie("my_mood"));

    sum-=1;
    $('span#world-happiness').text(sum);


  });

  /*
  $("#minus").everyTime(1000, function() {
    $(this).animate({ left: +500 });
  });
  */
  var timeout= 3000;
  //var dx= 0;
  setInterval(function() {
    //timeout=5000;

    var banner= $("#banner");
    var x= banner.offset().left;
    var bannerWidth= banner.width(); //1632
    var bodyWidth= $('body').width();
    var dx= 30*Math.ceil((Math.random()-1/2)*3);
    //dx+=dx2;
    //$("div#test").text(x+'|'+dx+"|"+dx2);
    //banner.animate({ left: x-100 });

    /**/
    if ((x+dx<0) && (bannerWidth+x+dx>bodyWidth)) {
      banner.animate({ left: x+dx }, timeout);
    } else if (x+dx>0) {
      banner.animate({ left: 0 }, timeout);
    } else if (bannerWidth+x+dx<bodyWidth) {
      banner.animate({ right: 0 }, timeout);
    }
    /**/
    //$("div#test").text(x+'|'+(bannerWidth+x)+"~"+bodyWidth);


  }, timeout);

  $("#test").click(function() {
    var test= 30*Math.ceil((Math.random()-1/2)*3);
    $(this).text(test);
  });

  $('#segment').click(function (e) {
    var xClick= e.pageX - $(this).offset().left;
    var yClick= e.pageY - $(this).offset().top;
    var segmentLength= $(this).width();



    var FLAG_showResults= false;
    $('#results').hide();
    switch ($('#denominator').text()) {
      case 'half': var denominator= 2; $('#denominator').text('third part'); break;
      case 'third part': var denominator= 3; $('#denominator').text('fourth part'); break;
      case 'fourth part': var denominator= 4; $('#denominator').text('fifth part'); break;
      case 'fifth part':
        var denominator= 5;

        //$('#instruction').hide();
        //$('#segment').hide();

        //$('#results').addClass('main-text');
        //$('#results').addClass('shadowed-main-text');

        //$('#results').show();

        FLAG_showResults= true;


        break;

      default: var denominator= 1; console.log("[!] ERROR in denominator");
    }




    results[denominator]= Math.min(
      xClick/segmentLength,
      (segmentLength-xClick)/segmentLength
    );

    diff[denominator]=  /**/ denominator* /**/  Math.abs( (results[denominator]-1/denominator) );

    accuracy[denominator]= 100* ( 1-diff[denominator] + Math.abs( 1-diff[denominator] ) )/2;

    //console.log(xClick+" | "+segmentLength+" | "+denominator+" => { "+results[denominator]+" | "+diff[denominator]+" }");

    if (FLAG_showResults) {
      //var _path='?';
      var stdDev= 0;
      var n= 0;
      for (var key in diff) {

        stdDev+=Math.pow( diff[key] , 2 );
        n++;

        //_path+="diff"+key+"="+diff[key]+"&";
        $.cookie("accuracy"+key, accuracy[key], { expires: cookieExp, path: '/'});
      }
      stdDev=Math.sqrt( stdDev/(n-1) );
      $.cookie("stddev", stdDev, { expires: cookieExp, path: '/'});

      // input to db

      window.location = "divide-results.html"/*+_path+'blbl=blbl'*/;
    }

  });

  $('#segment').mousemove(function (e) {
    $('#cutoff').css( {left: e.pageX } );
    $(this).mouseleave(function () {
      $('#cutoff').css( {left: -100} );
    });
  });








});
