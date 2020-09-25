import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-blank-note',
  templateUrl: './blank-note.page.html',
  styleUrls: ['./blank-note.page.scss'],
})
export class BlankNotePage implements OnInit {

  constructor(public afs: AngularFirestore,) { }

  ngOnInit() {
  }
  createNote(value) {
    let currentUser = firebase.auth().currentUser;
    this.afs.collection('Notes').doc(currentUser.uid).collection('note').add({
      title: value.title,
      description: value.description,
      image: value.image,
      tag: value.tag,
      document: value.document,
      video: value.video
    }).then(
      // res => resolve(res),
      // err => reject(err)
      )
  }
}
