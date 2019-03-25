<template>
  <q-card>
    <!--<form @submit.prevent="submit_form">-->
    <q-card-main>
      <q-field>
        <q-btn-toggle float-label="Kind" v-model="note.kind" :options="kind_options" flat/>
      </q-field>

      <q-field>
        <q-input v-model="note.artist" type="text" float-label="Artist" autofocus clearable>
          <!--<q-autocomplete-->
            <!--@search="search_artist"-->
          <!--/>-->
        </q-input>
      </q-field>

      <q-field>
        <q-input v-model="note.album" type="text" float-label="Album" clearable/>
      </q-field>

      <q-field v-if="is_download_url_visible">
        <q-input v-model="note.download_url" type="url" float-label="Download URL" clearable/>
      </q-field>

      <q-field v-if="is_download_path_visible">
        <q-input v-model="note.download_path" type="text" float-label="Download path" clearable/>
      </q-field>

      <q-field v-if="is_release_date_visible">
        <q-datetime
          v-model="note.release_date"
          type="date"
          :first-day-of-week="1"
          format="DD.MM.YYYY"
          float-label="Release date"
          minimal
        />
      </q-field>

      <q-field>
        <q-input v-model="note.details" type="textarea" rows="3" float-label="Details" clearable/>
      </q-field>
    </q-card-main>
    <q-card-separator/>
    <q-card-actions align="end">
      <q-btn label="Save" type="submit" @click="submit_form" color="primary" :loading="is_saving"/>
    </q-card-actions>
    <!--</form>-->
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
// import API from 'api/artists'

export default {
  name: 'NoteForm',

  props: {
    note: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      is_saving: false
    }
  },

  computed: {
    ...mapState(['note_kinds']),

    kind_options () {
      if (this.note_kinds) {
        return this.note_kinds.entries.map(kind => { return { label: kind[1].title, value: kind[0] } })
      } else {
        return []
      }

      // let options = []
      // for (const kind of Object.entries(this.note_kinds)) {
      //   options.push({label: kind[1].title, value: kind[0]})
      // }
      // return options
    },

    is_download_url_visible () {
      return this.note.kind === 'download'
    },

    is_download_path_visible () {
      return this.note.kind === 'download'
    },

    is_release_date_visible () {
      return this.note.kind === 'await'
    }
  },

  methods: {
    // search_artist (terms, done) {
    //   API.query({ search: terms })
    //     .then(artists => {
    //       const result = artists.map(artist => {
    //         return { label: artist.name, value: artist.name }
    //       })
    //
    //       done(result)
    //     })
    // },

    submit_form () {
      this.$emit('submit-form', this.note)
    }
  }
}
</script>

<style>
  .q-field {
    margin-bottom: 1rem;
  }
</style>
