import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router ) {
    this.afAuth.authState.subscribe(user =>{
      if(user)
      {

        this.user = user;
        
        localStorage.setItem('user', JSON.stringify(this.user));
      } else{
        console.log('user is null')
        localStorage.setItem('user' , null);
      }
    })
   }
   

  async loginWithEmail(email,pwd)
  {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email,pwd);
  this.router.navigate(['all-notes']);

  }

  async signUpWithEmail(email, pwd)
  {
      var result = await this.afAuth.auth.createUserWithEmailAndPassword(email,pwd)
  }
  googleAuth()
  {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider)
  {
    return this.afAuth.auth.signInWithPopup(provider).then((result) =>{
      console.log(result);
      console.log('You have been successfully Logged in!')
      this.router.navigate(['all-notes']);
    }).catch((error) => {
      console.log(error);
    });

    
  }
}
