import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlankNotePageRoutingModule } from './blank-note-routing.module';

import { BlankNotePage } from './blank-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlankNotePageRoutingModule
  ],
  declarations: [BlankNotePage]
})
export class BlankNotePageModule {}
