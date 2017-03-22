import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  regForm;
  message = "";
  constructor(public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, private auth: AuthService, private af: AngularFire) { }

  ngOnInit() {
    var emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var namePattern = '[\\w\\-\\s\\/]+';
    
    this.regForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(namePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(namePattern)]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
 
  onSubmit(regForm) {
    this.auth.createNewUserEmailPassword(regForm);
    this.message = "Hello " + regForm.firstName + ", Let's Register Your Account";


  }
}
