const Thruway = require("thruway.js");
const Rx = require("rxjs");




// A poor man's user database.
//
var USERDB = {
    // A user with an unsalted password
    'joe': {
       'ticket': 'deadpool',
       'role': 'frontend'
    },
    // A user with a salted password
    'bing': {
        'ticket':'mypassword',
        'role':'frontend'
    }
 };


  // This is our custom authenticator procedure that we register
// under URI "noname.authenticate", and that will be called
// by Crossbar.io to authenticate other WAMP session (e.g. browser frontends)
//
function authenticate (realm, authid, details) {
    // var realm = args[0];
    // var authid = args[1];
    // var details = args[2];
 
    console.log("authenticate called:", realm, authid, details);
    let ticket = details.ticket;
    let principal = USERDB[authid];

    if(principal){
        if (ticket!=principal.ticket) {
            throw "invalid ticket!";
        }
        else{
            console.log("authentication succeeded");
            return principal;
        } 
    }
    else{
        throw "no user found with id:"+authid;
    }
    
    
    
 }

 const wamp = new Thruway.Client('ws://127.0.0.1:9200/ws', 'noname.daemon');


 console.log("custom authenticator connected");
 wamp.register('noname.authenticate', authenticate).subscribe(
     function (reg) {
         console.log("Ok, custom authenticator procedure registered",reg);
     },
     function (err) {
         console.log("Oops, could not register custom authenticator", err);
     }
 );