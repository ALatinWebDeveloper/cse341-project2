const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Products']
    const products = await mongodb.getDb().db().collection('products').find();

    if (!products) {
        res.status(404).json({ message: 'No products found' });
        return;
    }
    products.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    });
}

const getSingle = async (req, res) => {
    //#swagger.tags = ['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const products = await mongodb.getDb().db().collection('products').find({ _id: productId });

        if (!products) {
            return res.status(404).json({ message: 'Invalid contact ID' });

        }

        products.toArray().then((products) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(products[0]);
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const createProduct = async (req, res) => {
    try {
        //#swagger.tags = ['Products']

        // Create a product
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            manufacturer: req.body.manufacturer
        };

        const response = await mongodb.getDb().db().collection('products').insertOne(newProduct);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        //#swagger.tags = ['Products']
        const productId = new ObjectId(req.params.id);

        const updateProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            manufacturer: req.body.manufacturer
        };

        const response = await mongodb.getDb().db().collection('products').updateOne({ _id: productId }, { $set: updateProduct });

        if (response.matchedCount === 0) {
            res.status(404).json({ message: 'Invalid ID' });
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteProduct = async (req, res) => {
    //#swagger.tags = ['Products']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
    }
    const ProductId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('products').deleteOne({ _id: ProductId });
    if (response.deletedCount === 0) {
        res.status(404).json({ message: 'Invalid ID' });
    } else {
        res.status(200).json(response);
    }
}

module.exports = { getAll, createProduct, getSingle, createProduct, updateProduct, deleteProduct };