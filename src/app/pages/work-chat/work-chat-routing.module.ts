import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkChatPage } from './work-chat.page';

const routes: Routes = [
  {
    path: '',
    component: WorkChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkChatPageRoutingModule {}
