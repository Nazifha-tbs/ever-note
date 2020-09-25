import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewNoteModalPageRoutingModule } from './new-note-modal-routing.module';

import { NewNoteModalPage } from './new-note-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewNoteModalPageRoutingModule
  ],
  declarations: [NewNoteModalPage]
})
export class NewNoteModalPageModule {}
