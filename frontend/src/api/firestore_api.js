import firebase from 'firebase'
import 'firebase/firestore'
import config from './firebase_config'

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
