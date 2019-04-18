const { Draft } = require("../database/draft");

module.exports.showDrafts = async function(req, res) {
    const drafts = await Draft.find();
    res.json({ drafts });
};

module.exports.createDraft = async function(req, res) {
    const { title, markdown } = req.body;
    console.log(req.body);

    if (!title || !markdown) {
        return res.json({ error: "Got an empty title or markdown field" });
    }
    const newDraft = new Draft({
        title,
        markdown
    });

    const savedDraft = await newDraft.save();

    res.json({ result: "Success", savedDraft});
};

module.exports.editDraft = async function(req, res) {
    const id = req.params.id;
    const { title, markdown } = req.body;

    if (!title || !markdown) {
        return res.json({ error: "Got an empty title or markdown field" });
    }
    const toUpdate = {
        title,
        markdown
    };
    const updatedDraft = await Draft.findByIdAndUpdate(id, toUpdate, { new: true });

    res.json({ result: "Success ", updatedDraft });
};

module.exports.deleteDraft = async function(req, res) {
    const id = req.params.id;
    const deleted = await Draft.findByIdAndDelete(id);
    res.json({ result: "Success", deleted: deleted});
};
