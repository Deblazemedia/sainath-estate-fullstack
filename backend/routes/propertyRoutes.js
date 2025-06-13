const express = require('express');
const router = express.Router();
const {
    addProperty,
    updateProperty,
    getAllProperties,
    getPropertyById,
    getRecentProperties,
    deleteProperty
} = require('../controllers/propertyController');

const verifyToken = require('../middleware/authMiddleware'); // ✅ Auth middleware

// 🔐 Protected routes (require login token)
router.post('/', verifyToken, addProperty);
router.put('/:id', verifyToken, updateProperty);
router.delete('/:id', verifyToken, deleteProperty);


// 🌐 Public routes
router.get('/', getAllProperties);
router.get('/recent', getRecentProperties);
router.get('/:id', getPropertyById);

module.exports = router;
