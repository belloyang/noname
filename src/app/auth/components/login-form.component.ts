import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Authenticate } from '../models/user';
import {Router} from '@angular/router'
@Component({
  selector: 'bc-login-form',
  templateUrl: "./login-form.html",
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
      margin: 72px 0;
    }

    md-card-title,
    md-card-content {
      display: flex;
      justify-content: center;
    }

    input {
      width: 300px;
    }

    .loginError {
      padding: 16px;
      width: 300px;
      font-color: white;
      background-color: red;
    }

    .loginButtons {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  `,
  ],
})
export class LoginFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    }

    this.form.enable();
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<Authenticate>();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router:Router) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  gotoRegister(){
    console.log("gotoRegister");
    this.router.navigate(['/register']);
  }
}
