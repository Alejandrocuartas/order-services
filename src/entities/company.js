const { model, Schema } = require('mongoose');

const tableSchema = new Schema({
    number: {
        type: Number,
    }
})

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
    }
});

/* eslint-disable func-names */
companySchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
};

module.exports = model('company', companySchema);
