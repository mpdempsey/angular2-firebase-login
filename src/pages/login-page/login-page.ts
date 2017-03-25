import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home'
import { RegisterPage } from '../../pages/register/register'
import { AuthService } from '../../providers/auth-service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Storage} from '@ionic/storage';
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})

export class LoginPage {

  loginForm;

  constructor(public _navCtrl: NavController, private _storage: Storage, private _formBuilder: FormBuilder, public _navParams: NavParams, public _auth: AuthService) {


  
  }

   
  ionViewDidLoad() {
   
  }

  ngOnInit() {
    var emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i; 
    
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

      this._storage.ready().then(() => {
       var  emailFromStorage;
       var  passwordFromStorage;
//this._storage.clear();
       // set a key/value
      // _storage.set('name', 'Max');

       // Or to get a key/value pair
       this._storage.get('email').then((val) => {
         emailFromStorage = val;
         console.log('Your email is', emailFromStorage);
       })
       this._storage.get('password').then((val) => {
          passwordFromStorage = val;
         console.log('Your password is', passwordFromStorage);
     
     if(emailFromStorage ==null || passwordFromStorage == null) { //The user should just login
        console.log('EmailFromStorage or passwordFromStorage equals null');
       }

       if(emailFromStorage !=null && passwordFromStorage != null){
         console.log('both values are available login automatically');
     (<FormControl> this.loginForm.controls['email']).setValue(emailFromStorage); 
     (<FormControl> this.loginForm.controls['password']).setValue(passwordFromStorage);
     
      }
    

  if (emailFromStorage == null) {
        console.log(emailFromStorage + ' == null');
    }

    if (emailFromStorage === null) {
        console.log(emailFromStorage + ' === null');
    }

    if (typeof emailFromStorage === 'undefined') {
        console.log(emailFromStorage + ' is undefined');
    }

    })
     });

    
  }

getUserInfoFromStorage(){

}

setUserInfoToStorage(){

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
    this._auth.loginWithEmailAndPassword(loginForm);
    this._storage.set('email', loginForm.email);
    this._storage.set('password', loginForm.password);

    this._navCtrl.push(HomePage);

  }

   check(x, name) {
   
}

}
