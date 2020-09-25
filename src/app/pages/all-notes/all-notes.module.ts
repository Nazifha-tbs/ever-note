import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllNotesPageRoutingModule } from './all-notes-routing.module';

import { AllNotesPage } from './all-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllNotesPageRoutingModule
  ],
  declarations: [AllNotesPage]
})
export class AllNotesPageModule {}
