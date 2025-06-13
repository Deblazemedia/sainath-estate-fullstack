const Creative = require('../models/CreativeImage');

// Add new creative image
const addCreative = async (req, res) => {
    try {
        const creative = new Creative(req.body);
        const saved = await creative.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: "Failed to add creative image" });
    }
};

// Get all creatives or filter by place
const getCreatives = async (req, res) => {
    try {
        const { place } = req.query;
        const filter = place ? { place: { $regex: place, $options: 'i' } } : {};
        const data = await Creative.find(filter).sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch creatives" });
    }
};

// Update creative image by ID
const updateCreative = async (req, res) => {
    try {
        const updated = await Creative.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updated) return res.status(404).json({ error: "Creative image not found" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update creative image" });
    }
};

// Delete creative image by ID
const deleteCreative = async (req, res) => {
    try {
        const deleted = await Creative.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Creative image not found" });
        res.status(200).json({ message: "Creative image deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete creative image" });
    }
};

module.exports = {
    addCreative,
    getCreatives,
    updateCreative,
    deleteCreative
};
