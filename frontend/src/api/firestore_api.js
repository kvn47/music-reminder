import firebase from 'firebase/app'
import 'firebase/firestore'
import config from './firebase_config'

const app = firebase.initializeApp(config)

const store = app.firestore()

const notes_collection = store.collection('notes')

export {
  store,
  notes_collection

  // query (resource, _params) {
  //   return store.collection(resource).get()
  // },
  //
  // get (resource, id) {
  //   return store.collection(resource).doc(id).get()
  // },
  //
  // add (resource, data) {
  //   store.collection(resource).add(data)
  //     .then(ref => {
  //       const new_data = Object.assign({}, { id: ref.id }, data)
  //       return Promise.resolve(new_data)
  //
  //       // ref.get().then(snap => {
  //       //   return snap.data()
  //       // })
  //     })
  // },
  //
  // update (resource, data) {
  //   const id = data.id
  //   delete data.id
  //   return store.collection(resource).doc(id).set(data)
  // },
  //
  // delete (resource, id) {
  //   return store.collection(resource).doc(id).delete()
  // }
}
