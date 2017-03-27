import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home'
import { RegisterPage } from '../../pages/register/register'
import { AuthService } from '../../providers/auth-service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})

export class LoginPage {

  loginForm;

  constructor(public _navCtrl: NavController, private _storage: Storage, private _formBuilder: FormBuilder, public _navParams: NavParams, public _auth: AuthService) {

  }

  ngOnInit() {
    var emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.prepopulateUserInfoFromStorage();

  }

  prepopulateUserInfoFromStorage() {
    this.getUserInfoFromStorage().then(info => this.prepopulateUserInfo(info));
  }



  getUserInfoFromStorage() {
    return this._storage.ready()
      .then(() => Promise.all([this._storage.get('email'), this._storage.get('password')])
        .then(array => {
          return { email: array[0], password: array[1] };
        }));
  }

  prepopulateUserInfo(userInfo: any) {
    if (userInfo.email != null && userInfo.password != null) {
      (<FormControl>this.loginForm.controls['email']).setValue(userInfo.email);
      (<FormControl>this.loginForm.controls['password']).setValue(userInfo.password);
    }
  }



  registerNewUser(): void {
    this._navCtrl.push(RegisterPage);
  }

  signInWithGoogle(): void {
    this._auth.loginWithGoogle()
      .then(() => this.onSignInSuccess());
    this._navCtrl.push(HomePage);
  }

  private onSignInSuccess(): void {
    console.log("Google display name ", this._auth.displayName());
  }

  onSubmit(loginForm) {
    console.log("in onsubmit loginform data is " + loginForm.email + " and " + loginForm.password );
    this._auth.loginWithEmailAndPassword(loginForm);
    this.setUserEmailAndPassword(loginForm).then(()=>{
    this._navCtrl.push(HomePage);
    });
  }

  setUserEmailAndPassword(loginForm) {

    return Promise.all([this._storage.set('email', loginForm.email), this._storage.set('password', loginForm.password)]);
      
  }


}
