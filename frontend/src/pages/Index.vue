<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page>
    <q-input
      v-model="search"
      debounce="500"
      type="search"
      placeholder="Search"
      borderless
      filled
      class="q-mx-lg q-mt-md"
    >
      <template v-slot:append>
        <q-icon v-if="search === ''" name="fas fa-search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
      </template>
    </q-input>

    <template v-if="is_searching">
      <notes-list :notes="found_notes"/>
    </template>

    <q-tabs v-else v-model="active_tab" align="justify" inverted no-pane-border>
      <template v-for="(kind, kind_name, index) in note_kinds">
        <q-tab
          slot="title"
          :key="kind_name"
          :name="`tab-${kind_name}`"
          :icon="kind.icon"
          :color="kind.color"
          :default="index === 0"
        />
      </template>
    </q-tabs>

    <q-tab-panels v-model="active_tab" animated>
      <template v-for="(kind, kind_name) in note_kinds">
        <q-tab-panel :name="`tab-${kind_name}`" :key="kind_name">
          <notes-list :notes="notes_of_kind(kind_name)" @edit-note="edit_note"/>
        </q-tab-panel>
      </template>
    </q-tab-panels>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="fas fa-plus" color="positive" direction="up">
        <template v-for="(kind, kind_name) in note_kinds">
          <q-fab-action @click="add_note(kind_name)" :icon="kind.icon" :color="kind.color" :key="kind_name"/>
        </template>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="is_modal_visible" maximized>
      <q-layout container>
        <q-toolbar slot="header" :color="form_color">
          <q-btn @click="close_form" flat round dense icon="fas fa-times"/>
          <q-toolbar-title>{{ form_title }}</q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <note-form :note="active_note" @submit-form="save_note"/>
        </div>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script>
import NotesList from 'components/NotesList'
import NoteForm from 'components/NoteForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NotesPage',
  components: { NotesList, NoteForm },

  data () {
    return {
      active_tab: 0,
      active_note: {},
      is_modal_visible: false,
      search: ''
    }
  },

  provide () {
    return {
      edit_note: this.edit_note
    }
  },

  created () {
    // this.fetch_notes()
  },

  computed: {
    ...mapGetters(['notes_of_kind', 'search_notes', 'note_kinds']),

    is_searching () {
      return this.search !== ''
    },

    found_notes () {
      if (this.is_searching) {
        return this.search_notes(this.search)
      } else {
        return []
      }
    },

    form_title () {
      let title = this.active_note.kind
      if (!title) return ''
      title = title.toString()
      return title.charAt(0).toUpperCase() + title.slice(1)
    },

    form_color () {
      const kind = this.active_note.kind
      if (!kind) {
        return 'primary'
      } else {
        return this.note_kinds[kind].color
      }
    }
  },

  methods: {
    ...mapActions(['fetch_notes', 'create_note', 'update_note']),

    add_note (kind) {
      this.active_note = { kind: kind }
      this.show_form()
    },

    edit_note (note) {
      this.active_note = Object.assign({}, note)
      this.show_form()
    },

    save_note (note) {
      if (note.id === undefined) {
        this.create_note(note)
      } else {
        this.update_note(note)
      }
      this.active_note = {}
      this.close_form()
    },

    show_form () { this.is_modal_visible = true },

    close_form () { this.is_modal_visible = false }
  }
}
</script>

<style>
  .q-layout-page {
    padding-bottom: 4rem;
  }
</style>
