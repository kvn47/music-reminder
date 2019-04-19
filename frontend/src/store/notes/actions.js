import { notes_collection } from 'api/firestore_api'

// import API from 'api/notes'

export function fetch_notes ({ commit }) {
  // return API.query().then(notes => commit('set_notes', notes))

  return notes_collection.onSnapshot(res => {
    const notes = []

    res.forEach(doc => {
      const note = build_note(doc)
      notes.push(note)
    })

    commit('set_notes', notes)
  })
}

export function fetch_note ({ commit }, id) {
  // return API.get(id)

  return notes_collection.doc(id).onSnapshot(doc => build_note(doc))
}

export function create_note ({ commit }, data) {
  // return API.create(data).then(note => commit('add_note', note))

  return notes_collection.add(data)

  // return notes_collection.add(data).then(ref => {
  //   ref.get().then(doc => {
  //     const note = build_note(doc)
  //     commit('add_note', note)
  //   })
  // })
}

export function update_note ({ commit }, note) {
  // return API.update(params).then(note => commit('replace_note', note))

  return notes_collection.doc(note.id).set(note) // .then(() => commit('replace_note', note))
}

export function delete_note ({ commit }, note) {
  // return API.delete(note.id).then(id => commit('remove_note', id))

  return notes_collection.doc(note.id).delete() // .then(() => commit('remove_note', id))
}

function build_note (doc) {
  const note = doc.data()
  note.id = doc.id
  if (note.release_date !== undefined) {
    note.release_date = note.release_date.toDate()
  }
  return note
}
