//const:

var cookieExp= 1440/24/60; //in DAYs

//on page ready:

$(document).ready(function() {
  console.log("PAGE HAS LOADED");

  setUrid();

  /*
  var mf_h= $('table#mainform').height;
  console.log(mf_h);
  $("div#vert").css({'height': mf_h*0.75});
  */

  populateTasks();

});

//functions:

function setUrid() {
  var urid= $.cookie("urid");
  if (urid/*==null*/) {
    console.log("COOKIE 'urid' HAS ALREADY SET AS "+urid);
  } else {
    urid= Math.floor( Math.random()*(999999-100000+1) + 100000 );//100000;//Math.random(100000,999999);
    console.log("COOKIE 'urid' SET AS "+urid);
  }
  $.cookie("urid", urid, { expires: cookieExp, path: '/'});
}

function populateTasks() {
  var taskContent= '';

  $.getJSON('/api/todo', function(data) {
    $.each(data, function(){
      taskContent+= '<li>'+this.task+'</li>';
    });

    $('#LIST').html(taskContent);
  });
}
