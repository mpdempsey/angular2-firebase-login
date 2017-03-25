import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController} from 'ionic-angular'
import { AuthService } from '../../providers/auth-service';
import { LoginPage} from '../../pages/login-page/login-page';
import { UserInfoPage} from '../../pages/user-info/user-info';
/*
  Generated class for the MenuPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu-popover',
  templateUrl: 'menu-popover.html'
})
export class MenuPopoverPage {
 

  constructor(public navCtrl: NavController,public viewCtrl: ViewController,private auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPopoverPage');
  }
  close() {
    this.viewCtrl.dismiss();
  }

  logoutClicked() { 
    
     this.viewCtrl.dismiss();
     this.auth.logout().then((user) => {
      console.log("logged out successfully " + user);
       this.navCtrl.push(LoginPage);
            }).catch((error) => {
            console.log(error);
          }); 
}

userInfoClicked() { 
  this.viewCtrl.dismiss();
  this.navCtrl.push(UserInfoPage);
}
}
