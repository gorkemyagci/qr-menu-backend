const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    categoryID: { type: Schema.Types.ObjectId, ref: 'Category' },
});

ProductSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });
    next();
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;