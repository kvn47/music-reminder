<template>
  <q-card flat>
    <q-card-main>
      {{note.details}}
    </q-card-main>
    <q-card-separator/>
    <q-card-actions align="around">
      <q-btn :icon="next_kind.icon" :color="next_kind.color" @click="advance_note" flat/>
      <q-btn icon="fas fa-edit" color="secondary" @click="edit_note(note)" flat/>
      <q-btn icon="fas fa-trash" color="negative" @click="delete_note(note)" flat/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
    ...mapState(['note_kinds']),
    ...mapGetters(['next_kind_for']),

    next_kind () {
      return this.next_kind_for(this.note.kind)
    }
  },

  methods: {
    ...mapActions(['update_note', 'advance_note', 'delete_note'])
  }
}
</script>

<style>
</style>
