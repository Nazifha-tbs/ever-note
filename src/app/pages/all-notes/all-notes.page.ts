import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController, ModalController, IonButton } from '@ionic/angular';
import { PopoverComponent } from 'src/app/Component/popover/popover.component';
import { NewNoteModalPage } from 'src/app/Modal/new-note-modal/new-note-modal.page';
@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.page.html',
  styleUrls: ['./all-notes.page.scss'],
})
export class AllNotesPage implements OnInit {

  public folder: string;
  constructor(private activatedRoute: ActivatedRoute, public popoverController: PopoverController, public modalController: ModalController) {

   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.queryParamMap.get('title');
  }
  async options(ev){
    
    console.log(ev);
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event : ev,
      cssClass: 'pop-over-options',
      translucent : true,
      showBackdrop : false,
      componentProps: { page: 'allNotes' }
    });
    return await popover.present();

   
  }
  async newNote(){
    const newNote = await this.modalController.create({
      component: NewNoteModalPage,
      cssClass:'new-note-modal sc-ion-modal-md-h',
      showBackdrop : true,
      animated : true

    });
    return await newNote.present();
  }
 
}
