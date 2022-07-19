const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
    products: {
        type: [{
            name: String,
            amount: Number,
        }],
        required: [true, 'The products of the order are required'],
    },
    table: {
        type: Number,
        required: [true, 'The number of the table of the order is required'],
    },
    petition: {
        type: String,
    },
    received: {
        type: Boolean,
        default: false,
    },
    paid: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
    },
});

const tableSchema = new Schema({
    number: {
        type: Number,
        required: [true, 'The number of the table is required'],
    },
    qr: {
        type: String,
        required: [true, 'The qr url is required.'],
    },
});

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    email: {
        type: String,
        required: [true, 'The email is required.'],
        unique: true,
    },
    tables: {
        type: [tableSchema],
    },
    orders: {
        type: [orderSchema],
    },
    active: {
        type: Boolean,
        default: true,
    },
});

/* eslint-disable func-names */
companySchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
};

module.exports = model('company', companySchema);
