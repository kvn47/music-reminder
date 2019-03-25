export function note_kinds (state) {
  return state.note_kinds
}

export const notes_of_kind = (state) => (kind) => {
  return state.notes.filter(note => note.kind === kind)
}

export const search_notes = (state) => (str) => {
  return state.notes.filter(note => {
    return note.artist.toLowerCase().includes(str.toLowerCase()) ||
      note.album.toLowerCase().includes(str.toLowerCase())
  })
}

export const next_kind_for = (state) => (kind_name) => {
  const kind = state.note_kinds[kind_name]
  if (kind !== undefined) {
    return state.note_kinds[kind.next]
  } else {
    return {}
  }
}
