import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public af: AngularFire) {



  }

  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout() {
    return this.af.auth.logout();
  }

  createNewUserEmailPassword(registrationForm: any) {
    console.log("createNewUserEmailPassword has been called");

    return this.af.auth.createUser({
      // Create user
      email: registrationForm.email,
      password: registrationForm.password
    }).then((user) => {
      console.log('in registration the object is ' + user.uid);

      var registrationReference = this.af.database.list('users');
      var userRef = this.af.database.object('users/' + user.uid);
      console.log("registrationReference is " + registrationReference.$ref);
      userRef.set({
        date: firebase.database['ServerValue']['TIMESTAMP'],
        firstName: registrationForm.firstName,
        lastName: registrationForm.lastName,
        regUser: user.uid,
        email: registrationForm.email
      })
      /*   registrationReference.set({
           date: firebase.database['ServerValue']['TIMESTAMP'],
           firstName: registrationForm.firstName,
           lastName: registrationForm.lastName,
           regUser: user.uid,
           email: registrationForm.email
           
         })*/
    }).catch((error) => {
      console.log(error);
    })


  }


  loginWithEmailAndPassword(testForm: any) {

    var emailString = String(testForm.email);
    var passwordString = String(testForm.password);
    var cred = {
      email: emailString,
      password: passwordString
    };
    const config = { provider: AuthProviders.Password, method: AuthMethods.Password };
    return this.af.auth.login(
      cred, config
    ).then((user) => {
      console.log(user);
    }).catch((error) => {
      console.log("error in login" + error);
    })


  }
  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }
}