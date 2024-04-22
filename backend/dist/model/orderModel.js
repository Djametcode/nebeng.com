"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = exports.ItypeOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var ItypeOrder;
(function (ItypeOrder) {
    ItypeOrder["Ride"] = "ojek";
    ItypeOrder["Food"] = "makanan";
    ItypeOrder["Drink"] = "minuman";
    ItypeOrder["Delivery"] = "kirim";
})(ItypeOrder || (exports.ItypeOrder = ItypeOrder = {}));
const orderSchema = new Schema({
    typeOrder: {
        type: Schema.Types.ObjectId,
        ref: 'Services'
    },
    total: {
        type: Number,
        required: [true, 'Please provide total order']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    isTaken: [
        {
            istTaken: {
                type: Boolean,
                default: false
            },
            takenBy: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    location: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        required: [true, 'Please provide your location']
    },
    cashOnDelivery: {
        type: Boolean,
        default: false,
    },
    isComplete: {
        type: Boolean,
        default: false
    }
});
exports.orderModel = mongoose_1.default.model('Order', orderSchema);
