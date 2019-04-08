import * as firebase from 'firebase';

export class AuthService {
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email: string, password: string)
        .catch(
            error => console.log(error);
        );
    }
}
