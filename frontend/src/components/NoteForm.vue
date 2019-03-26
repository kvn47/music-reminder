<template>
  <q-card>
    <!--<form @submit.prevent="submit_form">-->
    <q-card-section>
      <q-btn-toggle v-model="note.kind" :options="kind_options" flat/>

      <q-input v-model="note.artist" type="text" label="Artist" autofocus clearable>
        <!--<q-autocomplete-->
          <!--@search="search_artist"-->
        <!--/>-->
      </q-input>

      <q-input v-model="note.album" type="text" label="Album" clearable/>

      <q-input
        v-if="is_download_url_visible"
        v-model="note.download_url"
        type="url"
        label="Download URL"
        clearable
      />

      <q-input
        v-if="is_download_path_visible"
        v-model="note.download_path"
        type="text"
        label="Download path"
        clearable
      />

      <q-input
        v-if="is_release_date_visible"
        v-model="note.release_date"
        label="Release date"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="fas fa-calendar" class="cursor-pointer">
            <q-popup-proxy>
              <q-date
                v-model="note.release_date"
                :first-day-of-week="1"
                label="Release date"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input v-model="note.details" type="textarea" rows="3" label="Details" clearable/>
    </q-card-section>

    <q-separator/>

    <q-card-actions align="right">
      <q-btn label="Cancel" v-close-popup></q-btn>
      <q-btn label="Save" type="submit" @click="submit_form" color="primary" :loading="is_saving"/>
    </q-card-actions>
    <!--</form>-->
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['note_kinds_array']),

    kind_options () {
      if (this.note_kinds_array) {
        return this.note_kinds_array.map(kind => { return { label: kind.title, value: kind.name } })
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
</style>
