import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { PopoverComponent } from '../popover/popover.component';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  year : any;
  months : any;
  date : any;
  public title:any
  constructor(private calendar: Calendar, private popCalendar: PopoverController) {

    this.year = new Date().getFullYear();
    this.months = new Date().getMonth() - 1;
    this.date = new Date();
    console.log(this.months);
   }

  ngOnInit() {
    // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // cordova.plugins.Keyboard.disableScroll(true);


  }
  CreateNote(){
    this.popCalendar.dismiss(this.title);
  }
  async open() {
    let calendar =await this.popCalendar.create({
      component : CalendarComponent
    });

    return await calendar.present();
    // this.calendar.openCalendar(new Date()).then(
    //   (msg) => { console.log(msg); },
    //   (err) => { console.log(err); }
    // );
  }


  
}
