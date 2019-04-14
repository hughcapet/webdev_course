<template>

    <div class="container">
        <div class="row mt-4">
            <div class="col text-center">
                <h1 class="light">New draft</h1>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-6 col-sm-12">
                <h1 class="light">Markdown</h1>
                <textarea class="info"
                        v-model="markdown"/>
            </div>
            <div class="col-md-6 col-sm-12">
                <h1 class="light">Preview</h1>
                <div class="info">{{markdown}}</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Markdown',
        data() {
            return {
                markdown: ''
            }
        }
    }
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
