<template>
  <q-list no-border>
    <template v-for="note in notes">
      <q-collapsible :label="note_label(note)" :key="note.id" collapse-icon="fas fa-angle-down" group="notes" popup>
        <note-card :note="note"/>
      </q-collapsible>
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
    note_label (note) { return [note.artist, note.album].join(' - ') }
  }
}
</script>

<style>
</style>
