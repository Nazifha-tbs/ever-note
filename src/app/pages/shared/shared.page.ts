import { Component, OnInit } from '@angular/core';
import { PopoverComponent } from 'src/app/Component/popover/popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.page.html',
  styleUrls: ['./shared.page.scss'],
})
export class SharedPage implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }
  async options(ev) {

    console.log(ev);
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      showBackdrop: false,
      componentProps: { page: 'shared' }
    });
    return await popover.present();


  }
}
