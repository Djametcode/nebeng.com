"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderTakenModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const orderTakenSchema = new Schema({
    takenBy: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderFor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.orderTakenModel = mongoose_1.default.model('OrderTaken', orderTakenSchema);
