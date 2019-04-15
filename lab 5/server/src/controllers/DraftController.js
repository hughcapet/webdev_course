const { Draft } = require("../database/draft");

module.exports.showDrafts = function(req, res) {
    res.json({ result: "Return all drafts" });
};

module.exports.createDraft = function(req, res) {
    res.json({ result: "Create new drafts" });
};

module.exports.editDraft = function(req, res) {
    const id = req.params.id;
    res.json({ result: "Edit draft " + id});
};

module.exports.deleteDraft = function(req, res) {
    const id = req.params.id;
    res.json({ result: "Delete draft " + id});
}