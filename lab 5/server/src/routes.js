const DraftController = require('./controllers/DraftController')

module.exports = (app) => {
    app.get("/drafts", DraftController.showDrafts);

    app.post("/drafts", DraftController.createDraft);

    app.put("/drafts/:id", DraftController.editDraft);

    app.delete("/drafts/:id", DraftController.deleteDraft)

};
