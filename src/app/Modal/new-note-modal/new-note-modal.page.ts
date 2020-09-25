import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { AlertController, PopoverController, ModalController, Platform, LoadingController, NavController } from '@ionic/angular';
import { ReminderComponent } from 'src/app/Component/reminder/reminder.component';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
// import { resolve } from 'dns';
import { reject } from 'q';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-note-modal',
  templateUrl: './new-note-modal.page.html',
  styleUrls: ['./new-note-modal.page.scss'],
})
export class NewNoteModalPage implements OnInit {
  reminder: any;
  imageURI: any;
  imageFileName: any;
  ref: any;
  noteList = [];
  notes: any;
  constructor(public afAuth: AngularFireAuth, public base64: Base64, 
    private filePath: FilePath, private fileChooser: FileChooser, public navCtrl: NavController,
    private popOver: PopoverController, private modalCtrl: ModalController,private router : Router) {
    // this.ref = firebase.database().ref('Note/').on('value',(resp) => {
    //   console.log(resp);
    //   console.log(resp.val());
    // });

  }
  ngOnInit() {
  }
  async openSelected(item) {

    if (item == 'reminder') {
      this.reminder = await this.popOver.create({
        component: ReminderComponent,
        cssClass: 'app-reminder',
      })
      this.closeModal();
      return this.reminder.present();

      //   let alert = await this.alertCtrl.create({
      //     cssClass: 'app-reminder',
      //   inputs : [{
      //     placeholder : 'Add reminder',

      //   }]
      // });
      //   this.closeModal();
      // await  alert.present();

      //    function open(){
      // // this.calendar.createCalendar('reminderCal').then(
      //       //   (msg) => {console.log(msg)},
      //       //   (err) =>{ console.log(err)}
      //       // );
    } else if (item == 'attachment') {
      this.upload();

    } else if (item == 'blankNote')
    {
      this.closeModal();
      this.router.navigate(['/blank-note']);
    }
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }
  upload() {
    this.fileChooser.open().then(uri => {
      alert('uri' + JSON.stringify(uri));
      console.log(uri);
      this.filePath.resolveNativePath(uri)
        .then(file => {
          alert('file' + JSON.stringify(file));
          console.log('file' + file);
          let filePath: string = file;
          if (filePath) {

            // this.base64.encodeFile(filePath)
            //   .then((base64File: string) => {
            //     alert('base64File' + JSON.stringify(base64File));
            //   }, (err) => {
            //     alert('err' + JSON.stringify(err));
            //   });
          }
        })
        .catch(err => console.log(err));
    })
      .catch(e => console.log(e)
        // alert('uri' + JSON.stringify(e)) 
      );
  }

}
