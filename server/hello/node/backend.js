///////////////////////////////////////////////////////////////////////////////
//
//  Copyright (C) 2014, Tavendo GmbH and/or collaborators. All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
//  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
//  POSSIBILITY OF SUCH DAMAGE.
//
///////////////////////////////////////////////////////////////////////////////

// var autobahn = require('autobahn');

const Thruway = require("thruway.js");
const Rx = require("rxjs");

const userDB = require("./user-login-info.js");

console.log("userInfo:",userDB.UserLoginInfo);
// // A poor man's user database.
// //
// var USERDB = {
//     // A user with an unsalted password
//     'joe': {
//        'secret': 'deadpool',
//        'role': 'frontend'
//     },
//     // A user with a salted password
//     'bing': {
//         'secret':'mypassword',
//         'role':'frontend'
//     }
//  };




 

const wamp = new Thruway.Client('ws://127.0.0.1:9200/ws', 'noname.daemon');
// var connection = new autobahn.Connection({
//    url: 'ws://127.0.0.1:9200/ws',
//    realm: 'realm1'}
// );

// connection.onopen = function (wamp) {

//    // SUBSCRIBE to a topic and receive events
//    //
//    function onhello (args) {
//       var msg = args[0];
//       console.log("event for 'onhello' received: " + msg);
//    }
//    wamp.subscribe('com.example.onhello', onhello).subscribe(
//       function (sub) {
//          console.log("subscribed to topic 'onhello'");
//       },
//       function (err) {
//          console.log("failed to subscribed: " + err);
//       }
//    );
    

    function authenticate(username, password){
        console.log("authenticate called:",username,password);
        for (let user of userDB.UserLoginInfo){
            if(user.username == username){
                if(user.password == password)
                {
                    return true;
                }
                else{
                    console.error("invalid password");
                    throw "invalid password";
                }
            }
            else{
                continue;
            }
            
        }
        console.error( "no user found with username:" +username);
        throw "no user found with username:" +username;
    }

    wamp.register('noname.backend.authenticate', authenticate).subscribe(
        function (reg) {
           console.log("procedure noname.backend.authenticate registered");
        },
        function (err) {
           console.log("failed to register procedure: noname.backend.authenticate" , err);
        }
     );

   // REGISTER a procedure for remote calling
   //
   function add2 (args) {
      var x = args[0];
      var y = args[1];
      console.log("add2() called with " + x + " and " + y);
      return x + y;
   }


   function add1 (arg0, arg1) {
    var x = arg0;
    var y = arg1;
    console.log("add1() called:", arg0,arg1);
    if(x && y){
        console.log("add1() called with " + x + " and " + y);
        return x + y;
    }
    else{
        return 0;
    }
    
  }

   wamp.register('com.example.add1', add1).subscribe(
      function (reg) {
         console.log("procedure add1() registered");
      },
      function (err) {
         console.log("failed to register procedure: " , err);
      }
   );


   wamp.register('com.example.add2', add2).subscribe(
    function (reg) {
       console.log("procedure add2() registered", reg);
    },
    function (err) {
       console.log("failed to register procedure: " , err);
    }
   );


   // PUBLISH and CALL every second .. forever
   //
//    var counter = 0;
//    setInterval(function () {

//       // PUBLISH an event
//       //
//       wamp.publish('com.example.oncounter', [counter]);
//       console.log("published to 'oncounter' with counter " + counter);

//       // CALL a remote procedure
//       //
//       wamp.call('com.example.mul2', [counter, 3]).subscribe(
//          function (res) {
//             console.log("mul2() called with result: " + res);
//          },
//          function (err) {
//             if (err.error !== 'wamp.error.no_such_procedure') {
//                console.log('call of mul2() failed: ' + err);
//             }
//          }
//       );

//       counter += 1;
//    }, 1000);
// };

// connection.open();
