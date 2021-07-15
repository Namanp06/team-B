const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        UUID: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email id'
            }
        }
    },
    {
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'lastUpdatedTime'
        }
    }
);

const User = (module.exports =
    mongoose.models.Event || mongoose.model('User', UserSchema));
