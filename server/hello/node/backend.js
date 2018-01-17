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

console.log("****    BACKEND noname.daemon started    ****");


const userDB = require("./user-login-info.js");

console.log("userInfo:",userDB.UserLoginInfo);

//Connect to MongoDB


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var dbo = db.db("mydb");
  dbo.createCollection("users", function(err, res) {
    if (err) throw err;

    console.log("Collection users created!");
    db.close();
  });

});



 

const wamp = new Thruway.Client('ws://127.0.0.1:9200/ws', 'noname.daemon');

    function createUser(username, password){
        console.log("createUser called");
        var url = "mongodb://localhost:27017";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var userInfo = { name: username, password: password };
            dbo.collection("users").insertOne(userInfo, function(err, res) {
            if (err) throw err;
            console.log("User password info added",username);
            db.close();
            });
        });

    }

    wamp.register('noname.backend.create_user',createUser).subscribe(
        function (reg) {
            console.log("procedure noname.backend.create_user registered");
         },
         function (err) {
            console.log("failed to register procedure: noname.backend.create_user" , err);
         }
    )
    
    function callback(result){
        console.log("callback:", result);
        return result;
    }

    function findUserInfo(username){
        var ret;
        console.log("findUserInfo:"+username);
        var promise =  new Promise(
            function(resolve, reject){
                MongoClient.connect(url,function(err,db){
                    if(err){
                        return reject(err);
                    }
                    else {
                        var dbo = db.db("mydb");
                        console.log("resolve");
                        
                        
                        ret =  dbo.collection("users").findOne({'name':username});
                        resolve(ret);
                           
                    }
                       
                })
            });
            console.log("promise:",promise);
            //let result = await promise;
            let result = {name:"test"};
            console.log("result:",result);
            return Rx.Observable.fromPromise(promise);
        };



















        var lookup = 'sarah';
        findUserInfo(lookup).subscribe(ret=>{
            console.log("findUserInfo for "+ lookup+":",ret);
        },
        err=>{
            console.error("findUserInfo failed:",err);
        });
       
        // MongoClient.connect(url).then( (db)=>{
        //     console.log("Mongodb connected:",db);
            
        //     var dbo = db.db("mydb");
        //     dbo.collection("users").findOne({'name':username}, function(err, result) {
        //       if (err) throw err;
        //       console.log("findOne:",result);
        //       db.close();
        //       ret = result;
        //     });
        //   })
        //   .catch(err=>{
        //       console.log("Mongodb connection failed", err);
        //   });
       
    

    wamp.register('noname.backend.get_user_pwd', findUserInfo).subscribe(

        function (reg) {
            console.log("procedure noname.backend.get_user_pwd registered");
         },
         function (err) {
            console.log("failed to register procedure: noname.backend.get_user_pwd" , err);
         }

    );
    
    function authenticateFromDb(username,password){
        var ret;
        console.log("authenticateFromDb:"+username,password);
        
        return findUserInfo(username).switchMap(userInfo=>{
            console.log("findUserInfo.map:",userInfo)
            if(userInfo){
                if(userInfo.password == password){
                return Rx.Observable.of(userInfo);
                }
                else{
                    return Rx.Observable.throw(new Error("invalid password"));
                }
            }
            else{
                return Rx.Observable.throw(new Error("invalid username"));
            }
            
        })
        .catch(err=>Rx.Observable.throw(err));
    }

    function authenticate(username, password){
        console.log("authenticate called:",username,password);
        for (let user of userDB.UserLoginInfo){
            if(user.username == username){
                if(user.password == password)
                {
                    console.log("authenticate succeeded!");
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

    wamp.register('noname.backend.authenticate', authenticateFromDb).subscribe(
        function (reg) {
           console.log("procedure noname.backend.authenticate registered");
        },
        function (err) {
           console.log("failed to register procedure: noname.backend.authenticate" , err);
        }
     );

   // REGISTER a procedure for remote calling
   //
 
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


