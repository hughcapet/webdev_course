<template>
    <div class="container">
        <h1>All drafts</h1>
        <ul>
            <li class="list-group-item list-group-item-light"
                v-for="draft in draftsList"
                v-bind:key="draft._id">
                <a href="#" v-on:click="showDraft(draft)">
                    {{ draft.title }}
                </a>
            </li>
        </ul>
        <button v-on:click="createDraft()" type="button" class="btn btn-lg btn-outline-dark mt-4">+</button>
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