//const:

var cookieExp= 1440/24/60; //in DAYs

//on page ready:

$(document).ready(function() {
  console.log("PAGE HAS LOADED");

  setUrid();

  populateTasks();

  $('#add_task').click(addTask); //чому тут не можна написати addTask() ??? чому без дужок??

  $('body').on('mouseenter','.tasks', function() {
    //alert('1');
    $(this).css({"font-weight": "bold"});
  });
  $('body').on('mouseleave','.tasks', function() {
    //alert('1');
    $(this).css({"font-weight": "normal"});
  });
  //$('li').click(/*this.id, getExec*/function() {alert('up!');});
  $('body').on('click','.tasks', getExec);


  $('#delete_executed').click(deleteExecuted);

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
    $.each(data, function() {

      if (this.executed) {
        var executed1= '<strike>';
        var executed2= '</strike>';
      } else {
        var executed1= '';
        var executed2= '';
      }

      taskContent+= '<li id="'+this._id+'" class=tasks style="z-index:10; " >'+executed1 +this.task+' ('+this.time+')'+executed2+'</li>';
    });

    $('#TODO').html(taskContent);
  });
}

function addTask() {
  //alert('add');

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
      $("#new_task").val(''); //textarea clear
      populateTasks();
    } else {
      alert('Error in DB writing');
    }
  });
}

function getExec(/*element*/) {
  var tid= this.id;
  var taskContent= '';
  $.getJSON('/api/todo/'+tid, function(data) {
    /**/
    populateTasks();
    /**
    if (data.executed) {
      var executed1= '<strike>';
      var executed2= '</strike>';
    } else {
      var executed1= '';
      var executed2= '';
    }

    taskContent+= '<li id="'+tid+'" class=tasks  >'+executed1 +data.task+' ('+data.time+')'+executed2+'</li>';
    $('#'+tid).html(taskContent);
    /**/
  });
}

function deleteExecuted() {

  if (confirm('Delete executed?')) {
    $.getJSON('/api/delexec', function(data) {
      populateTasks();
    });
  }
  
}
