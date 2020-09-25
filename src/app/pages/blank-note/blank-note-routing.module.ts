import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlankNotePage } from './blank-note.page';

const routes: Routes = [
  {
    path: '',
    component: BlankNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlankNotePageRoutingModule {}
