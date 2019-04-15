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
            <input class="col-md-4" type="text" name="title">

        <div class="row mt-4">
            <div class="col-md-6 col-sm-12">
                <h2 class="light">Markdown</h2>
                <textarea class="info"
                        v-model="markdown"/>
            </div>
            <div class="col-md-6 col-sm-12">
                <h2 class="light">Preview</h2>
                <div class="info" v-html="compiledMarkdown"></div>
            </div>
            <div class="col-md-6 mt-4">
                <button class="mr-2">save</button>
                <button>delete</button>
            </div>
        </div>

    </div>

</template>

<script>
    import marked from 'marked';

    export default {
        name: 'Markdown',
        data() {
            return {
                markdown: ''
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.markdown, {sanitize: true})
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
