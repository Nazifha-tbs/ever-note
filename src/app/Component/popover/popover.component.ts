import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
page : any;
  constructor(public navParams: NavParams) {
    console.log(this.navParams.get('page'));
   this.page = this.navParams.get('page');
   }

  ngOnInit() {}

}
