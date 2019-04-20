<template>
    <div>
        <div class="container">
            <h1>All drafts</h1>
            <ul class="list-group w-auto pb-2">
                <li class="list-group-item"
                    v-for="draft in draftsList"
                    v-bind:key="draft._id">
                    <a style="color: #2c3e50" href="#" v-on:click="showDraft(draft)">
                        {{ draft.title }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="container">
            <button v-on:click="createDraft()" type="button" class="btn btn-lg btn-outline-dark mt-1 mb-4">+</button>
        </div>
    </div>

</template>


<script>
    export default {
        name: "AllDrafts",
        props: ["draftsList", "showDraft", "createDraft"],
    }
</script>

<style scoped>

</style>