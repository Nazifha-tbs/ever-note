import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/Component/popover/popover.component';

@Component({
  selector: 'app-work-chat',
  templateUrl: './work-chat.page.html',
  styleUrls: ['./work-chat.page.scss'],
})
export class WorkChatPage implements OnInit {

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
      componentProps: { page: 'notebooks' }
    });
    return await popover.present();


  }
}
