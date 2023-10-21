const Category = require('../models/Category');
require('dotenv').config();

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name: name });
        res.status(201).json({ message: 'Category created', category: category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories: categories });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json({ category: category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { name: name });
        res.status(200).json({ message: 'Category updated', category: category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Category deleted', category: category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}