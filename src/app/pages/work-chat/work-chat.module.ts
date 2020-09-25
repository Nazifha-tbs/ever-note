import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkChatPageRoutingModule } from './work-chat-routing.module';

import { WorkChatPage } from './work-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkChatPageRoutingModule
  ],
  declarations: [WorkChatPage]
})
export class WorkChatPageModule {}
