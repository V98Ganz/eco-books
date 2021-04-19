import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCYYw-pisi8KldDs18mX0IxWpcWrC5t6Y8',
  authDomain: 'bookio-506c3.firebaseapp.com',
  databaseURL: 'https://bookio-506c3.firebaseio.com',
  projectId: 'bookio-506c3',
  storageBucket: 'bookio-506c3.appspot.com',
  messagingSenderId: '363370998258',
  appId: '1:363370998258:web:a30d5c55af3b232366636b',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };