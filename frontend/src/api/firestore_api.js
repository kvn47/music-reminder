import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAH6IRJ4oGMYIW0lUFWsVEUA4YvGNczhL4',
  authDomain: 'music-reminder-95b09.firebaseapp.com',
  databaseURL: 'https://music-reminder-95b09.firebaseio.com',
  projectId: 'music-reminder-95b09',
  storageBucket: 'music-reminder-95b09.appspot.com',
  messagingSenderId: '174101918698'
}

firebase.initializeApp(config)

const store = firebase.firestore()
// const auth = firebase.auth()
// const current_user = auth.currentUser

const notes_collection = store.collection('notes')

export {
  store,
  // auth,
  // current_user,
  notes_collection
}
