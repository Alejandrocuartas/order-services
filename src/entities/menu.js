const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name of the product is required'],
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const menuSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
        unique: true,
    },
    products: {
        type: [productSchema],
    },
});

/* eslint-disable func-names */
menuSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
};

module.exports = model('menu', menuSchema);
