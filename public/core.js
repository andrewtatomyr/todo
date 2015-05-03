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

  $('#submit').click(addTask); //чому тут не можна написати addTask() ??? а треба без дужок??

});

//functions:

function setUrid() {
  var urid= $.cookie("urid");
  if (urid/*==null*/) {
    console.log("COOKIE 'urid' HAS ALREADY SET AS "+urid);
  } else {
    urid= new Date().getTime()+'-'+Math.floor(Math.random()*99);
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

function addTask() {
  var newTask= {
    urid: $.cookie("urid"),
    task: $('#new_task').val(),
    executed: false,
    time: new Date()
  }

  $.ajax({
    type: "POST",
    data: newTask,
    url: '/api/todo',
    dataType: 'JSON'
  }).done(function(res) {
    if (res.msg==='OK') {
      $("#new_task").val('');
      populateTasks();
    } else {
      alert('Error in DB writing');
    }
  });


}
