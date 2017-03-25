import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Router } from '@angular/router';
import {Firebase} from '@firebase'
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login-page/login-page';
import { RegisterPage} from '../pages/register/register';
import { MenuPopoverPage} from '../pages/menu-popover/menu-popover';
import { UserInfoPage} from '../pages/user-info/user-info';
import { CustomValidators} from 'ng2-validation';
import {Storage} from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
