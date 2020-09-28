import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopoverController } from '@ionic/angular';
import * as firebase from 'firebase';
import { PopoverComponent } from 'src/app/Component/popover/popover.component';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.page.html',
  styleUrls: ['./notebooks.page.scss'],
})
export class NotebooksPage implements OnInit {
 public title:any;
 public description:any;
 public list : any[];
  constructor(public popoverController: PopoverController, public afs: AngularFirestore) {
    this.read_NoteList()
   }

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
  read_NoteList() {
    let data;
    
    let currentUser = firebase.auth().currentUser;
    data = this.afs.collection('Notes').doc(currentUser.uid).collection('note')
      .get().subscribe(data => {
        this.list = [];
        data.forEach(data2 => {
          this.list.push({
            title : data2.data().title,
            description : data2.data().description
          })
          console.log(data2.data())
        })
      })
    // return this.afs.collection('Notes').snapshotChanges();
  }
}
