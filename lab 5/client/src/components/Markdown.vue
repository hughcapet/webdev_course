<template>

    <div class="container">

        <div class="row mt-4">
            <div class="col text-center">
                <h1 class="light">Draft</h1>
            </div>
        </div>

        <div class="row mt-5">
            <h3 class="col light">Title</h3>
        </div>
            <input :value="currentTitle" @input="updateTitle" class="col-md-4" type="text" name="title">

        <div class="row mt-4">
            <div class="col-md-6 col-sm-12">
                <h2 class="light">Markdown</h2>
                <textarea :value="currentMD" @input="updateMD" class="info"
                        />
            </div>
            <div class="col-md-6 col-sm-12">
                <h2 class="light">Preview</h2>
                <div class="info" v-html="compiledMarkdown"></div>
            </div>
            <div class="col-md-6 mt-4">
                <button v-on:click="saveDraft(draftJSON)" class="mr-2">save</button>
                <button v-on:click="deleteDraft(draftJSON)">delete</button>
            </div>
        </div>

    </div>

</template>

<script>
    import marked from 'marked';
    import _ from "lodash";

    export default {
        name: 'Markdown',
        props: ["draftToShow", "saveDraft", "deleteDraft"],
        data() {
            if (this.draftToShow) {
                return {
                    _id: this.draftToShow._id,
                    currentTitle: this.draftToShow.title,
                    currentMD: this.draftToShow.markdown
                }
            }
            return {
                _id: 0,
                currentTitle: "Untitled",
                currentMD: "Your text here"
            }
        },
        computed: {
            compiledMarkdown() {
                return marked(this.currentMD, {sanitize: true})
            },
            draftJSON() {
                return {
                    _id: this._id,
                    title: this.currentTitle,
                    markdown: this.currentMD
                }
            }
        },
        methods: {
            updateTitle: _.debounce(function(event) {
                this.currentTitle = event.target.value;
            }, 500),
            updateMD: _.debounce(function(event) {
                this.currentMD = event.target.value;
            }, 500)
        },
        watch: {
            draftToShow(newDraft) {
                if (!newDraft) {
                    return
                }
                this._id = this.draftToShow._id;
                this.currentTitle = newDraft.title;
                this.currentMD = newDraft.markdown;
            }
        }
    };


</script>

<style>
    .light {
        color: white;
        text-shadow: 1px 1px 5px rgba(150, 150, 150, 0.9);
    }
    textarea {
        resize: none;
        outline: none;
    }

    .info {
        height: 400px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.9);
    }

    h1 {
        text-align: center;
    }
</style>
