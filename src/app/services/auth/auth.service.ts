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
  // -----------------------------------------------------
  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const scopes = ['profile', 'email'];
    return this.socialSignIn(provider.providerId, scopes);
  }
  socialSignIn(providerName: string, scopes?: Array<string>): Promise<any> {
    const provider = new auth.OAuthProvider(providerName);

    // add any permission scope you need
    if (scopes) {
      scopes.forEach(scope => {
        provider.addScope(scope);
      });
    }

    
      // web but not desktop, for example mobile PWA
    return this.afAuth.auth.signInWithRedirect(provider);
    
  }
  // --------------------
  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.user) {
        this.afAuth.auth.signOut()
          .then(() => {
            console.log("LOG Out");
            localStorage.removeItem('user');
            localStorage.removeItem('Email');
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

}
