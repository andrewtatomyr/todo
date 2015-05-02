// set up
var express= require("express");
var app= express();
var mongoose= require("mongoose");
var cookieParser = require('cookie-parser');

//var morgan= require("morgan");
//var bodyParser= require("body-parser");
//var cookieParser= require("cookie-parser");
//var methodOverride= require("method-override");




// configuration

/**/
mongoose.connect('mongodb://hm:12345678@proximus.modulusmongo.net:27017/umud5adU'); //my own on modulus.io: { "login": "todo", "password": "12345678" }

/**/
app.set('port', (process.env.PORT || 5001));//
/**/
app.use(express.static(__dirname+'/public'));
//app.use(morgan("dev"));
app.use(cookieParser());
//app.use(bodyParser.urlencoded({'extended': 'true'}));
//app.use(bodyParser.json());
//app.use(bodyParser.json({ type: "application/vnd.api+json"}));
//app.use(methodOverride());






/**/
// define model

var TodoSchema = new mongoose.Schema({


  "task": Number,
  "executed": Boolean,
  "time": Number

});


var Todo= mongoose.model("Todo", TodoSchema);



// routes

  // api





  app.get("/api/todo", function(req,res) {

    Todo.find(function(err,todos) {
      if (err) {
        res.send(err);
      } else {
        res.json(todos);
      }
    });

  });
/**/
  app.post("/api/todo", function(req,res) {
    //console.log("Cookies: ", req.cookies);

    //var mood= req.cookies.my_mood;
    //console.log("mood: ", mood);
    var newTask= req.body.new_task;
    console.log("task: ", newtask);
    var now= Math.round(new Date().getTime()/1000.0);
    console.log("now (UNIX): ", now);



/**/
        Todo.create(  //save??
          {
            "task": newTask,
            "executed": false,
            "time": now
          },
        function(err, level  ) {  //'level'???
          if (err) {
            res.send(err);
          } else {
            console.log('Levels created');

            Todo.find(function(err,todos) {
              if (err) {
                res.send(err);
              } else {
                res.json(todos);
              }
            });

            //res.end();
          }

        });
/**/
  



/**
    Level.create({ //save??
      "urid": urid,
      "mood": mood,
      "unixTime": now
    }, function(err, level  ) {  //'level'???
      if (err) {
        res.send(err);
      } else {
        console.log('hl created');

        /**
        var blbl= seekInLevel();
        console.log( seekInLevel(
          //{ unixTime: {"$gt": now-24*60*60} }
        ) );


        res.json(blbl);

        /**/
//        Level.find(function(err,levels) {
//          if (err) {
//            res.send(err);
//          } else {
//            res.json(levels);
//          }
//        });
        /**/
//      }
//    });

//  });
/*
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.param.todo_id
    },function(err, todo) {
      if (err) {
        res.send(err);
      } else {
        Todo.find(function(err, todos) {
          if (err) {
            res.send(err);
          } else {
            res.json(todos);
          }
        });
      }
    });


  });
*/






// application
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});





// listen
/**
app.listen(8080);
console.log("App listened on port 8080");
/**/
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
/**/
