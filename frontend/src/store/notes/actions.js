import { notes_collection } from 'api/firestore_api'
import API from 'api/notes'

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
  return API.get(id)
}

export function create_note ({ commit }, params) {
  // return API.create(params).then(note => commit('add_note', note))

  return notes_collection.add(params).then(ref => {
    ref.get().then(doc => {
      const note = build_note(doc)
      commit('add_note', note)
    })
  })
}

export function update_note ({ commit }, params) {
  return API.update(params).then(note => commit('replace_note', note))
}

export function advance_note ({ commit, state }, note) {
  const new_kind = state.note_kinds[note.kind].next
  update_note({ id: note.id, kind: new_kind })
}

export function delete_note ({ commit }, id) {
  // return API.delete(id).then(id => commit('remove_note', id))
}

function build_note (doc) {
  const note = doc.data()
  note.id = doc.id
  return note
}
