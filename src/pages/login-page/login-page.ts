import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home'
import { RegisterPage } from '../../pages/register/register'
import { AuthService } from '../../providers/auth-service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})

export class LoginPage {

  constructor(public navCtrl: NavController, private fb: FormBuilder, public navParams: NavParams, public auth: AuthService) { }
  loginForm;

  ionViewDidLoad() {
   
  }

  ngOnInit() {
    var emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i; 
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }


  registerNewUser(): void {
    this.navCtrl.push(RegisterPage);
  }

  signInWithGoogle(): void {
    this.auth.loginWithGoogle()
      .then(() => this.onSignInSuccess());
    this.navCtrl.push(HomePage);
  }

  private onSignInSuccess(): void {
    console.log("Google display name ", this.auth.displayName());
  }

  onSubmit(loginForm) {
    this.auth.loginWithEmailAndPassword(loginForm);
    this.navCtrl.push(HomePage);
  }

}
