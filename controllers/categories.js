const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const result = await mongodb.getDb().db().collection('categories').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const categoryId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('categories').findOne({ _id: categoryId });
        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createCategory = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const newCategory = {
            name: req.body.name,
            description: req.body.description,
        };
        const response = await mongodb.getDb().db().collection('categories').insertOne(newCategory);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(400).json({ message: 'Failed to create category' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCategory = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const categoryId = new ObjectId(req.params.id);
        const updateData = {
            name: req.body.name,
            description: req.body.description,
        };
        const response = await mongodb.getDb()
            .db()
            .collection('categories')
            .updateOne({ _id: categoryId }, { $set: updateData });
        if (response.matchedCount === 0) {
            return res.status(400).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated', modifiedCount: response.modifiedCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCategory = async (req, res) => {
    //#swagger.tags = ['Categories']
    try {
        const categoryId = new ObjectId(req.params.id);
        const response = await mongodb.getDb()
            .db()
            .collection('categories')
            .deleteOne({ _id: categoryId });
        if (response.deletedCount === 0) {
            return res.status(400).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle, createCategory, updateCategory, deleteCategory };