import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_SCRIPT_SRC = 'https://apis.google.com/js/api.js';
  readonly DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
  readonly SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';

  googleAuth = new BehaviorSubject<any>(null);

  isAuthorized = new BehaviorSubject<boolean>(false);

  setSigninStatus() {
    console.log('wow');
    const user = this.googleAuth.value.currentUser.get();
    this.isAuthorized.next(user.hasGrantedScopes(this.SCOPE));
    console.log(this.isAuthorized.value);
  }

  updateSigninStatus() {
    this.setSigninStatus();
  }

  constructor() {
    // this.googleAuth.subscribe(googleAuth => {
    //   googleAuth.isSignedIn.listen(this.updateSigninStatus);
    // });
  }

  isSignedIn(): boolean {
    return this.googleAuth.value.isSignedIn.get();
  }

  signIn() {
    this.googleAuth.value.signIn();
  }

  signOut() {
    this.googleAuth.value.signOut();
  }

}
