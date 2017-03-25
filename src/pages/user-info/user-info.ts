import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the UserInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {
  public press: number = 0;
  public pan: number = 0;
  public swipe2: number = 0;
  public tap: number = 0;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  // our list of avatars
  avatars = [
    {
      name: 'Udelhoven Companies',
      image: 'https://static1.squarespace.com/static/5540040ee4b0ef1b81385f43/t/5546fb36e4b0ac8a00c820cf/1430715200337/udelhoven-oilfield-system-services.jpg?format=300w',
      visible: true,
      description: 'Exposed Wires near fuel source',
      location: 'Anchorage, Alaska',
      actionTaken: 'Notified Safety Officer, and I put warning sign by the wires.',
      additionalAction: 'No',
      suggestedSolution: 'Remind electrical team to be cautious with exposed wires.',
      threatLevel: '5'
    },
    {
      name: 'Michael',

      visible: false,
      description: 'Nails sticking out in pathway',
      location: 'Katy, Texas',
      actionTaken: 'Notified Safety Officer, and I bent the nails away',
      additionalAction: 'No',
      suggestedSolution: 'Remind electrical team to be cautious with exposed wires.',
      threatLevel: '5'
    },
    {
      name: 'Yam',
      visible: false,
      description: 'Yam is a retard',
      location: 'Loserville, USA',
      actionTaken: 'Notified Safety Officer, and I put warning sign by the wires.',
      additionalAction: 'No',
      suggestedSolution: 'Remind electrical team to be cautious with exposed wires.',
      threatLevel: '5'
    },
    {
      name: 'Lil Mijo',
      visible: false,
      description: 'Lil Mijo is the God of the Earth, King of Kings',
      location: 'Heavens Gates',
      actionTaken: 'Notified Safety Officer, and I put warning sign by the wires.',
      additionalAction: 'No',
      suggestedSolution: 'Remind electrical team to be cautious with exposed wires.',
      threatLevel: '5'
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }
  tapEvent(e) {
    this.tap++
  }
  pressEvent(e) {
    this.press++
  }
  panEvent(e) {
    this.pan++
  }


  // action triggered when user swipes
  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    // out of range
    if (currentIndex > this.avatars.length || currentIndex < 0) return;

    let nextIndex = 0;

    // swipe right, next avatar
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isLast = currentIndex === this.avatars.length - 1;
      nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // swipe left, previous avatar
    if (action === this.SWIPE_ACTION.LEFT) {
      const isFirst = currentIndex === 0;
      nextIndex = isFirst ? this.avatars.length - 1 : currentIndex - 1;
    }

    // toggle avatar visibility
    this.avatars.forEach((x, i) => x.visible = (i === nextIndex));
  }
}

