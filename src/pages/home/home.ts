import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular'
import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { PopoverController } from 'ionic-angular'
import { MenuPopoverPage } from '../../pages/menu-popover/menu-popover';
import {FormBuilder, Validators,FormGroup, FormControl } from '@angular/forms'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
purchaseForm;
  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, af: AngularFire, public fb: FormBuilder, private _auth: AuthService, public popoverCtrl: PopoverController) {
  //  this.items = af.database.list('/expenses');
  //github test comment
  }


ngOnInit() {
   
    this.purchaseForm = this.fb.group({
      purchaseItem: ['', [Validators.required]],
      purchaseCost: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  presentMenuPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuPopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}