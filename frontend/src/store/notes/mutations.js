export function set_notes (state, notes) {
  state.notes = notes
}

export function add_note (state, note) {
  state.notes.push(note)
}

export function replace_note (state, note) {
  state.notes = state.notes.map(n => {
    if (n.id === note.id) return note
    return n
  })
}

export function remove_note (state, id) {
  const index = state.notes.findIndex(n => n.id === id)
  state.notes.splice(index, 1)
}
