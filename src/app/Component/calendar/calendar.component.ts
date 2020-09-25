import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  date: any;
  currentMon: any;
  daysInThisMonth: any[];
  daysInLastMonth: any[];
  daysInNextMonth: any[];
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment: any;
  constructor() {
    this.date = new Date();
    this.segment = 'Date';
    this.currentMon = this.date;
    this.getDaysOfMonth(this.currentMon);

    
  }



  ngOnInit() { }

  async segmentChanged(value, ev) {
    await this.slider.slideTo(this.segment);
    if (value == 'Date') {
      this.slider.slideTo(0);
    }
    if (value == 'Time') {
      this.slider.slideTo(1);
    }
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    if (this.segment == 0) {
      this.segment = 'Date';
    } else {
      this.segment = 'Time';
    }
  }

  getDaysOfMonth(currentMon) {
    this.daysInThisMonth = [];
    this.daysInLastMonth = [];
    this.daysInNextMonth = [];
    this.monthNames = this.date.getMonth();
    console.log(this.monthNames);
    // this.currentMonth = ['January'];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
      
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
    for (var i = 0; i < (6 - lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i + 1);
    }
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
    
  }
  goToLastMonth() {
    this.currentMon = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth(this.currentMon);
  }

  goToNextMonth() {
    this.currentMon = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth(this.currentMon);
  }
}
