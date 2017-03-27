import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login-page/login-page'
import { RegisterPage} from '../pages/register/register';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import { Firebase} from '@firebase';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { CustomValidators, CustomFormsModule} from 'ng2-validation';
import { MenuPopoverPage} from '../pages/menu-popover/menu-popover';
import { UserInfoPage} from '../pages/user-info/user-info';
import { IonicStorageModule} from '@ionic/storage';
export const firebaseConfig = {
  apiKey: "AIzaSyCwvvdtk0_IWsvjGneqBRMVomKkx8pVkWU",
    authDomain: "ambitiousdevelopment-65e11.firebaseapp.com",
    databaseURL: "https://ambitiousdevelopment-65e11.firebaseio.com",
    storageBucket: "ambitiousdevelopment-65e11.appspot.com",
    messagingSenderId: "64002168371"
}
export const firebaseAuthConfig = {
  method: AuthMethods.Password,
  provider: AuthProviders.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MenuPopoverPage,
    UserInfoPage
   
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    MenuPopoverPage,
    UserInfoPage
  ],
  providers: [AuthService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
