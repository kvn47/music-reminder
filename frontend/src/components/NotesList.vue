<template>
  <q-list no-border>
    <template v-for="note in notes">
      <q-expansion-item
        :key="note.id"
        group="notes"
        :label="note_label(note)"
        :caption="note_caption(note)"
        expand-icon="fas fa-angle-down"
        popup
      >
        <note-card :note="note"/>
      </q-expansion-item>
    </template>
  </q-list>
</template>

<script>
import NoteCard from 'components/NoteCard'

export default {
  name: 'NotesList',
  components: { NoteCard },

  props: {
    notes: { type: Array }
  },

  data () {
    return {}
  },

  methods: {
    note_label (note) { return [note.artist, note.album].join(' - ') },

    note_caption (note) {
      if (note.kind === 'await') {
        return note.release_date.toLocaleDateString()
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
</style>
