var cookieExp= 1440/24/60; //in DAYs

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


});
