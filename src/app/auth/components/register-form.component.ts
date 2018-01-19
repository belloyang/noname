import { Component, OnInit } from '@angular/core';
import {WampAnonymousService} from '../services/wamp-anonymous.service'
import {Router} from '@angular/router'
import { ResultMessage } from 'thruway.js/src/Messages/ResultMessage';

@Component({
  selector: 'bc-register-form',
  templateUrl:"./register-form.html",
  styles: [`
  .loginError {
    padding: 16px;
    width: 300px;
    font-color: white;
    background-color: red;
  } console.log('com.example.add1:', r);
`]
})
export class RegisterFormComponent implements OnInit {

  firstname:string;
  lastname:string;
  username:string;
  password:string;
  password_confirm:string;
  errorMessage:any;
  constructor(private wamp:WampAnonymousService, private router:Router) { }

  ngOnInit() {
  }
  submit(){
    console.log("submit：");
    if(!this.username){
      this.errorMessage ="please type in a user name!";
    }
    else if(!this.firstname || !this.lastname)
    {
      this.errorMessage ="please type in your name!";
    }
    else if(!this.password || !this.password_confirm)
    {
      this.errorMessage ="please set your password!";
    }
    else if(this.password !== this.password_confirm)
    {
      this.errorMessage = "You password does not match!";
    }
    else{
      // this.errorMessage = null;
      console.log("submit for registration");
      this.wamp.call('noname.backend.create_user',[this.username,this.password])
      .map((r: ResultMessage) => {
        return r.args[0];
      })
      .subscribe(
        ret =>{
          console.log("returned from registration successfully:",ret);
          this.errorMessage = null;
          this.router.navigate(['/login']);
        },
        err=>{
          console.error("failed for registration",err);
          this.errorMessage = "failed for registration";
        }
      )
    }

    


  }
}
