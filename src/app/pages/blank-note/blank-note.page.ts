import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-blank-note',
  templateUrl: './blank-note.page.html',
  styleUrls: ['./blank-note.page.scss'],
})
export class BlankNotePage implements OnInit {
  public noteTitle: any;
  public description: any;
  constructor(public afs: AngularFirestore,) {
   }

  ngOnInit() {
  }
  createNote() {
    let currentUser = firebase.auth().currentUser;
    console.log(currentUser.uid)
    return this.afs.collection('Notes').doc(currentUser.uid).collection('note').add({
      title: this.noteTitle,
      description: this.description,

      // title: value.title,
      // description: value.description,
      // image: value.image,
      // tag: value.tag,
      // document: value.document,
      // video: value.video
    });
    
  }
 
}
