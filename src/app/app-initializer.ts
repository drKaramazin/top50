import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

declare const gapi;

export function appInitializer(
  auth: AuthService,
): () => Promise<any> {
  return (): Promise<any> => new Promise<any>((resolve) => {
    let gApiListener;

    function initClient() {
      gapi.client.init({
        'apiKey': environment.youtube.apiKey,
        'discoveryDocs': [auth.DISCOVERY_URL],
        'clientId': environment.youtube.clientId,
        'scope': auth.SCOPE,
      }).then(() => {
      //   auth.googleAuth.next(gapi.auth2.getAuthInstance());
      //   auth.googleAuth.value.isSignedIn.listen(auth.updateSigninStatus.bind(auth));
      //
      //   const user = auth.googleAuth.value.currentUser.get();
      //
      //   auth.setSigninStatus();

        resolve();
      });
    }

    function handleClientLoad() {
      gApiScript.removeEventListener('load', gApiListener);
      gapi.load('client:auth2', initClient);
    }

    const gApiScript: HTMLScriptElement = document.createElement('script');
    gApiScript.async = true;
    gApiScript.defer = true;
    gApiScript.src = auth.API_SCRIPT_SRC;
    gApiListener = gApiScript.addEventListener('load', () => handleClientLoad());
    gApiScript.addEventListener('readystatechange', () => {
      if (this.readyState === 'complete') {
        handleClientLoad();
      }
    });
    document.body.appendChild(gApiScript);
  });
}
