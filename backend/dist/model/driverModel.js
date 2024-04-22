"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const driverSchema = new Schema({
    email: {
        type: String,
        required: [true, "please fill email"],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, "please fill password"]
    },
    firstName: {
        type: String,
        required: [true, "please provide first name"]
    },
    lastName: {
        type: String,
        required: [true, "please provide last name"]
    },
    avatar: {
        type: String,
        default: ""
    },
    orderComplete: [{
            orderId: {
                type: Schema.Types.ObjectId,
                ref: "Order"
            },
            comment: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                default: 0
            }
        }],
    balance: {
        type: Number,
        default: 0
    },
    phone: {
        type: String,
        required: [true, 'Please provide phone number']
    },
    isVerifed: {
        type: Boolean,
        default: false
    }
});
exports.driverModel = mongoose_1.default.model('Driver', driverSchema);
