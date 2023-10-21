const Product = require('../models/Product');
const { Readable } = require('stream');
const mongoose = require('mongoose');

exports.getProducts = async (req, res) => {
    try {
        let categoryID = req.query.categoryID;
        console.log(categoryID);
        const products = categoryID ? await Product.find({ categoryID: categoryID }).populate('categoryID') : await Product.find().populate('categoryID');
        res.status(200).json({ products: products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryID');
        res.status(200).json({ product: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { name, price, image, categoryID } = req.body;
        const product = await Product.create({ name: name, price: price, image: image, categoryID: categoryID });
        res.status(201).json({ message: 'Product created', product: product });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, price, categoryID } = req.body;
        const image = req.file.filename;
        const product = await Product.findByIdAndUpdate(req.params.id, { name: name, price: price, image: image, categoryID: categoryID });
        res.status(200).json({ message: 'Product updated', product: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted', product: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}