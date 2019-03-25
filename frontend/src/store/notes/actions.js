import API from 'api/notes'

export function fetch_notes ({ commit }) {
  return API.query().then(notes => commit('set_notes', notes))
}

export function fetch_note ({ commit }, id) {
  return API.get(id)
}

export function create_note ({ commit }, params) {
  return API.create(params).then(note => commit('add_note', note))
}

export function update_note ({ commit }, params) {
  return API.update(params).then(note => commit('replace_note', note))
}

export function advance_note ({ commit, state }, note) {
  const new_kind = state.note_kinds[note.kind].next
  update_note({ id: note.id, kind: new_kind })
}

export function delete_note ({ commit }, id) {
  return API.delete(id).then(id => commit('remove_note', id))
}
