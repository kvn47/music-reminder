<template>
  <q-card flat>
    <q-card-section>
      {{note.details}}
    </q-card-section>
    <q-separator/>
    <q-card-actions align="around">
      <q-btn :icon="next_kind.icon" :color="next_kind.color" @click="advance_note(note)" flat/>
      <q-btn icon="fas fa-edit" color="secondary" @click="edit_note(note)" flat/>
      <q-btn icon="fas fa-trash" color="negative" @click="delete_note(note)" flat/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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

    advance_note (note) {
      note.kind = this.note_kinds[note.kind].next
      this.update_note(note)
    }
  }
}
</script>

<style>
</style>
