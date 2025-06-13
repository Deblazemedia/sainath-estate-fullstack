const Property = require('../models/Property');

// Add new property
const addProperty = async (req, res) => {
    try {
        const property = new Property(req.body);
        const saved = await property.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: "Failed to add property" });
    }
};

// Update existing property
const updateProperty = async (req, res) => {
    try {
        const updated = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // return updated document
        );

        if (!updated) return res.status(404).json({ error: "Property not found" });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update property" });
    }
};

// Get all / filter
const getAllProperties = async (req, res) => {
    try {
        const {
            location,
            category,
            offer,
            type,        // buy or rent
            page = 1,
            limit = 10
        } = req.query;

        let filter = {};
        let sort = { createdAt: -1 }; // Default sort: latest

        // Apply filters
        if (location) {
            filter.location = { $regex: location, $options: 'i' };
        }

        if (category) {
            filter.category = category; // luxury, commercial
        }

        if (type) {
            filter.type = type; // buy, rent
        }

        // Offer-based sorting (only "latest" now)
        if (offer === 'latest') {
            sort = { createdAt: -1 };
        }

        const skip = (page - 1) * limit;

        const total = await Property.countDocuments(filter);
        const properties = await Property.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            properties
        });

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch properties" });
    }
};



// Get single by ID
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: "Property not found" });
        res.status(200).json(property);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch property" });
    }
};

// Get recent properties
const getRecentProperties = async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recent = await Property.find({ createdAt: { $gte: oneWeekAgo } })
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json(recent);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch recent properties" });
    }
};

// Delete property by ID
const deleteProperty = async (req, res) => {
    try {
        const deleted = await Property.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Property not found" });
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete property" });
    }
};


module.exports = {
    addProperty,
    updateProperty,
    getAllProperties,
    getPropertyById,
    getRecentProperties,
    deleteProperty // 👈 Add this line
};
