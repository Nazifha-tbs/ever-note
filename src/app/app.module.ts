import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PopoverComponent } from './Component/popover/popover.component';
import { NewNoteModalPageModule } from './Modal/new-note-modal/new-note-modal.module';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ReminderComponent } from './Component/reminder/reminder.component';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { CalendarComponent } from './Component/calendar/calendar.component';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransferObject, FileTransfer} from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AngularFireModule } from '@angular/fire';


import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';



export const firebaseConfig = {


    apiKey: "AIzaSyA4zNPIGnxhh29kdUG4h5RMjXWVy4WfpMk",
    authDomain: "evernote-119a2.firebaseapp.com",
    databaseURL: "https://evernote-119a2.firebaseio.com",
    projectId: "evernote-119a2",
    storageBucket: "evernote-119a2.appspot.com",
    messagingSenderId: "1041505398965",
    appId: "1:1041505398965:web:59ad3d2a3f302d860f8efc",
    measurementId: "G-MWS5QHM6YY"

}
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent, PopoverComponent,ReminderComponent,CalendarComponent],
  entryComponents: [PopoverComponent, ReminderComponent, CalendarComponent],
  imports: [AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,

    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
     NewNoteModalPageModule
  ],
  providers: [
    Base64,
    FilePath,
    FileChooser,
    FileTransfer,
    AngularFirestore,
    // FileUploadOptions,
    FileTransferObject,
    File,
    Camera,
    Keyboard,
    Calendar,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
