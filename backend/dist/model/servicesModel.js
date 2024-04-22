"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderModel_1 = require("./orderModel");
const { Schema } = mongoose_1.default;
const serviceSchema = new Schema({
    type: {
        type: String,
        enum: Object.values(orderModel_1.ItypeOrder),
        required: [true, "Please provide type order"]
    },
    price: {
        type: Number,
        required: [true, 'Please provide services price']
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
});
exports.servicesModel = mongoose_1.default.model('Services', serviceSchema);
