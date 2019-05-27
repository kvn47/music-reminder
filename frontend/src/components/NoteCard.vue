<template>
  <q-card flat>
    <q-card-section>
      {{note.details}}
    </q-card-section>
    <q-separator/>
    <q-card-actions align="around">
      <q-btn @click="search_album(note)" icon="fas fa-search" color="info" flat/>
      <q-btn @click="copy_label(note)" icon="far fa-copy" color="secondary" flat/>
      <q-btn @click="edit_note(note)" icon="fas fa-edit" color="secondary" flat/>
      <q-btn @click="advance_note(note)" :icon="next_kind.icon" :color="next_kind.color" flat/>
      <q-btn @click="delete_note(note)" icon="fas fa-trash" color="negative" flat/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { note_label } from 'lib/note'

export default {
  name: 'NoteCard',
  inject: ['edit_note'],

  props: {
    note: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {}
  },

  computed: {
    ...mapGetters(['note_kinds', 'next_kind_for']),

    next_kind () {
      return this.next_kind_for(this.note.kind)
    }
  },

  methods: {
    ...mapActions(['update_note', 'delete_note']),

    copy_label () {
      navigator.clipboard.writeText(note_label(this.note))
        .then(() => {
          this.$q.notify({
            message: 'Copied',
            color: 'positive',
            timeout: 1000
          })
        })
    },

    search_album () {
      window.open('https://www.google.ru/search?q=' + note_label(this.note))
    },

    advance_note (note) {
      note.kind = this.note_kinds[note.kind].next
      this.update_note(note)
    }
  }
}
</script>

<style>
</style>
