import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC5mCg16UCn7KvPs3R-WohWgEFjiuNsTZI',
  authDomain: 'auto-test-platform-aeadd.firebaseapp.com',
  databaseURL: 'https://auto-test-platform-aeadd-default-rtdb.firebaseio.com',
  projectId: 'auto-test-platform-aeadd',
  storageBucket: 'auto-test-platform-aeadd.appspot.com',
  messagingSenderId: '818001159406',
  appId: '1:818001159406:web:ed8ccddfd14d4ac7cf7fff'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore.setLogLevel('debug');

export default firebase;
