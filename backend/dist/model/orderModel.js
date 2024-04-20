"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var ItypeOrder;
(function (ItypeOrder) {
    ItypeOrder["Ride"] = "ojek";
    ItypeOrder["Food"] = "makanan";
    ItypeOrder["Drink"] = "minuman";
    ItypeOrder["Delivery"] = "kirim";
})(ItypeOrder || (ItypeOrder = {}));
const orderSchema = new Schema({
    typeOrder: {
        type: String,
        enum: Object.values(ItypeOrder),
        required: [true, 'Please provide type order']
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
    }
});
