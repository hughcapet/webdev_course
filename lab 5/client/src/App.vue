<template>
  <div id="app">
      <all-drafts
              v-bind:draftsList="draftsList"
              v-bind:showDraft="showDraft"
              v-bind:createDraft="createDraft"
      />
     <!-- <hr>-->
      <markdown
              v-bind:draftToShow="draftToShow"
              v-bind:saveDraft="updateDraft"
              v-bind:deleteDraft="deleteDraft"
      />
  </div>
</template>

<script>
  import AllDrafts from "./components/AllDrafts";
  import Markdown from "./components/Markdown";
  import {API} from './services/Api'

  export default {
    name: 'app',
    components: {
      AllDrafts,
      Markdown
    },
    data() {
      return {
        draftsList: [],
        draftToShow: []
      }
    },
    created: async function() {
      const res = await API.get('/drafts');
      this.draftsList = res.data.drafts;
      this.draftToShow = this.draftsList[0]
    },
    methods: {
      showDraft(draft) {
        this.draftToShow = draft;
      },

      async createDraft() {
        const res = await API.post('/drafts', {
          title: "Untitled",
          markdown: "Your text"
        });
        this.draftsList.push(res.data.createdDraft);
        this.draftToShow = res.data.createdDraft;
      },

      async updateDraft(draft) {
        const id = draft._id;
        const res = await API.put('/drafts/' + id, {
          title: draft.title,
          markdown: draft.markdown
        });
        let index;
        for (let i = 0; i < this.draftsList.length; i++) {
          if (this.draftsList[i]._id === draft._id) {
            index = i;
            break;
          }
        }
        this.draftsList.splice(index, 1, res.data.updatedDraft);
        this.draftToShow = res.data.updatedDraft;
      },

      async deleteDraft(draft) {
        const id = draft._id;
        await API.delete('/drafts/' + id);
        let index;
        for (let i = 0; i < this.draftsList.length; i++) {
          if (this.draftsList[i]._id === draft._id) {
            index = i;
            break;
          }
        }
        this.draftsList.splice(index, 1);
        this.draftToShow = this.draftsList[0];
      }
    }
  }
</script>

<style>

    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      margin-top: 60px;
    }
</style>
