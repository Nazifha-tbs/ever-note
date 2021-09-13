import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public isToggled: boolean;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'All Notes',
      url: '/all-notes',
      icon: 'newspaper'
    },
    {
      title: 'Notebooks',
      url: '/notebooks',
      icon: 'reader'
    },
    {
      title: 'Shared with Me',
      url: '/shared',
      icon: 'people'
    },
    {
      title: 'Collect Photos',
      url: '/folder/Collect Photos',
      icon: 'images'
    },
    {
      title: 'Work Chat',
      url: '/work-chat',
      icon: 'chatbox'
    },
    {
      title: 'Dark Theme',
      // url: '/folder/Spam',
      icon: 'moon'
    }
    ,
    {
      title: 'Settings',
      url: '/folder/Settings',
      icon: 'settings-outline'
    }
    ,
    {
      title: 'Explore Evernote',
      url: '/folder/Explore Evernote',
      icon: 'settings'
    }
  ];
  public labels = ['Mar 3 11:07'];
  user: User;
  Email: any;
  constructor(public afAuth: AngularFireAuth, public router: Router ,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public authService: AuthService
  ) {
    
    this.initializeApp();
    this.checkUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
     


      // this.notify();
      // this.toggleDarkTheme();
    });


  }


  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

  }
  toggleDarkTheme(){
    document.body.classList.toggle('dark', this.isToggled);
  }
  public notify() {
   const themeToggle = document.querySelector('#themeToggle');
    console.log(themeToggle);
   
  }
  checkUser()
  {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user)
        this.user = user;
        // this.Email = user.email;
        localStorage.Email = user.email;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['all-notes']);
      } else {

        console.log('user is null')
        localStorage.removeItem('user')
        localStorage.removeItem('Email');
        // localStorage.setItem('user', null);
        this.router.navigate(['login']);
      }
    })
  }
}
