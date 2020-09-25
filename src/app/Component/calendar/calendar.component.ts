import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import * as moment from 'moment'
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
  selectedEvent: any = [];
  currentMonth: any;
  currentYear: any;
  selectedDay: any;
  currentDate: any;
  isSelected: any;
  selectedDate: any;
  selectedMonth: any;
  isMonthView: Boolean = true;
  weekStartDate: any;
  weekEndDate: any;
  eventList: any;
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment: any;
  constructor() {
    this.date = new Date();
    this.segment = 'Date';
    this.currentMon = this.date;
    this.getDaysOfMonth();

    
  }

  ngOnInit() {
    
    
   }

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
  getDaysOfMonth() {
    this.monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    if (!this.selectedDate) {
      this.selectedDate = this.currentDate + '-' + this.currentMonth + '-' + this.currentYear;
      this.selectedDay = this.currentDate;
      this.selectedMonth = this.date.getMonth();
    }

    if (this.isMonthView) {

      // Month View Start
      const firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
      const prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
      for (let i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
        this.daysInLastMonth.push(i);
      }

      const thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
      for (let i = 0; i < thisNumOfDays; i++) {
        this.daysInThisMonth.push(i + 1);
      }

      const lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
      const nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
      for (let i = 0; i < (6 - lastDayThisMonth); i++) {
        this.daysInNextMonth.push(i + 1);
      }
      const totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
      if (totalDays < 36) {
        for (let i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth)); i++) {
          this.daysInNextMonth.push(i);
        }
      }
      // Month View End

    } else {

      // Week View Start
      const currentDate = moment(this.selectedDate);
      this.date = currentDate.toDate();
      const weekStart = currentDate.clone().startOf('week');
      let weekDay;
      const days = [];
      this.daysInThisMonth = [];
      this.daysInNextMonth = [];
      this.daysInLastMonth = [];
      const selectedMonthName = this.monthNames[this.selectedMonth];
      for (let i = 0; i <= 6; i++) {
        if (!weekDay) {
          weekDay = weekStart;
        } else {
          weekDay = weekDay.add(1, 'days');
        }
        const month = Number(weekDay.format('M') - 2) < 0 ? 11 : Number(weekDay.format('M') - 2);

        const previousMonthName = this.monthNames[month];
        const weekMonth = weekDay.format('MMMM');
        // this.daysInThisMonth.push(Number(weekDay.format('D')));
        if (weekMonth === selectedMonthName) {
          this.daysInThisMonth.push(Number(weekDay.format('D')));
        } else if (previousMonthName === selectedMonthName) {
          this.daysInNextMonth.push(Number(weekDay.format('D')));
        } else {
          this.daysInLastMonth.push(Number(weekDay.format('D')));
        }
        days.push(weekDay.format('yyyy-MMMM-DD'));
      }
      this.weekStartDate = days[0];
      this.weekEndDate = days[6];
      console.log(days);
      // Week View End

    }

    if (this.currentMonth !== this.monthNames[this.selectedMonth]) {
      this.selectedEvent = [];
    }

  }

  getDayClass(day) {
    let todayDate = Number(moment().format('D'));
    let todayMonth = moment().format('MMMM');
    let todayYear = Number(moment().format('yyyy'));
    let selectedYear = Number(moment(this.selectedDate, 'DD-MMMM-yyyy').format('yyyy'));
    if (day === todayDate &&
      todayMonth === this.currentMonth &&
      todayYear === this.currentYear) {
      if (day === this.selectedDay && this.date.getMonth() === this.selectedMonth) {
        return 'currentDate selected-date';
      } else {
        return 'currentDate';
      }
    } else if (day === this.selectedDay && this.date.getMonth() === this.selectedMonth && this.currentYear === selectedYear) {
      return 'selected-date';
    } else {
      return 'otherDay';
    }

  }

  goToLastMonth() {
    if (this.isMonthView) {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    } else {
      if (this.daysInLastMonth.length > 0) {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        // this.toggleView();
      } else {
        if (this.daysInNextMonth.length > 0) {
          this.selectedDate = moment(this.weekStartDate).subtract(1, 'week').format('DD-MMMM-yyyy');
          // const month = (this.selectedMonth + 1) > 11 ? 0 : (this.selectedMonth + 1);
          // const year = (month === 0 && this.selectedMonth === 11) ? this.currentYear + 1 : this.currentYear;
          // this.selectedDate = this.daysInNextMonth[0] + '-' + this.monthNames[month] + '-' + year;
        } else {
          // this.selectedDate = moment(this.weekStartDate).subtract(1, 'week').format('DD-MMMM-yyyy');

          if (moment(this.weekStartDate).format('MMMM') === this.monthNames[this.currentMonth]) {

            this.selectedDate = moment(this.weekStartDate).subtract(1, 'week').format('DD-MMMM-yyyy');
          } else {
            this.selectedDate = moment(this.weekStartDate).subtract(1, 'days').format('DD-MMMM-yyyy');
          }

        }
        this.selectedDay = Number(moment(this.selectedDate).format('DD'));
        this.selectedMonth = Number(moment(this.selectedDate).format('M')) - 1;
      }
    }
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    if (this.isMonthView) {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    } else {
      if (this.daysInNextMonth.length > 0) {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        // this.toggleView();
      } else {
        if (this.daysInLastMonth.length > 0) {
          this.selectedDate = moment(this.weekEndDate).add(1, 'week').format('DD-MMMM-yyyy');
          // const month = (this.selectedMonth - 1) < 0 ? 11 : (this.selectedMonth - 1);
          // const year = (month === 11 && this.selectedMonth === 0) ? this.currentYear - 1 : this.currentYear;
          // this.selectedDate = this.daysInLastMonth[0] + '-' + this.monthNames[month] + '-' + year;
        } else {
          if (moment(this.weekEndDate).format('MMMM') === this.monthNames[this.currentMonth]) {

            this.selectedDate = moment(this.weekEndDate).add(1, 'week').format('DD-MMMM-yyyy');
          } else {
            this.selectedDate = moment(this.weekEndDate).add(1, 'days').format('DD-MMMM-yyyy');
          }
        }

        this.selectedDay = Number(moment(this.selectedDate).format('DD'));
        this.selectedMonth = Number(moment(this.selectedDate).format('M')) - 1;
      }
    }
    this.getDaysOfMonth();
  }
  selectDate(day) {
    this.isSelected = false;
    this.selectedDay = day;
    this.selectedMonth = this.date.getMonth();
    this.selectedDate = day + '-' + this.monthNames[this.date.getMonth()] + '-' + this.date.getFullYear();
    this.selectedEvent = [];
    if (day.toString().length === 1) {
      day = '0' + day;
    }
    let month = this.date.getMonth() + 1;
    if (month.toString().length === 1) {
      month = '0' + month;
    }
    const thisDate1 = this.date.getFullYear() + '-' + month + '-' + day + 'T00:00:00';
    this.eventList.forEach(event => {
      if (event.Shiftdate === thisDate1 && event.Hide !== true) {
        this.isSelected = true;
        event.formatedStartDate = moment(event.ShiftStartDate).format('MM/DD/YY');
        event.formatedEndDate = moment(event.ShiftEndDate).format('MM/DD/YY');
        this.selectedEvent.push(event);
      }
    });
  }
// ---------------------------------------------------------------------------------------------------
  // getDaysOfMonth() {
  //   this.daysInThisMonth = [];
  //   this.daysInLastMonth = [];
  //   this.daysInNextMonth = [];
  //   this.monthNames = this.date.getMonth();
  //   this.currentMonth = this.monthNames[this.date.getMonth()];
  //   console.log(this.monthNames);
   
  //   this.currentYear = this.date.getFullYear();
  //   if (this.date.getMonth() === new Date().getMonth()) {
  //     this.currentDate = new Date().getDate();
      
  //   } else {
  //     this.currentDate = 999;
  //   }

  //   var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  //   var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
  //   for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
  //     this.daysInLastMonth.push(i);
  //   }

  //   var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
  //   for (var i = 0; i < thisNumOfDays; i++) {
  //     this.daysInThisMonth.push(i + 1);
  //   }

  //   var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
  //   var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
  //   for (var i = 0; i < (6 - lastDayThisMonth); i++) {
  //     this.daysInNextMonth.push(i + 1);
  //   }
  //   var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
  //   if (totalDays < 36) {
  //     for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
  //       this.daysInNextMonth.push(i);
  //     }
  //   }
    
  // }
  // goToLastMonth() {
  //   this.currentMon = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
  //   this.getDaysOfMonth();
  // }

  // goToNextMonth() {
  //   this.currentMon = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
  //   this.getDaysOfMonth();
  // }
}
