"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var Gender;
(function (Gender) {
    Gender["Male"] = "Laki - Laki";
    Gender["Female"] = "Perempuan";
})(Gender || (Gender = {}));
var UserType;
(function (UserType) {
    UserType["Driver"] = "Driver";
    UserType["Human"] = "Human";
})(UserType || (UserType = {}));
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    userType: {
        type: String,
        enum: Object.values(UserType),
        required: [true, 'Please provide user type']
    },
    address: {
        type: String,
        required: [true, 'Please provide your address']
    },
    balance: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: Object.values(Gender),
        required: [true, 'Please provide gender']
    },
    email: {
        type: String,
        required: [true, 'Please provide email']
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    order: [
        {
            orderId: {
                type: Schema.Types.ObjectId,
                ref: 'Order'
            }
        }
    ],
    chat: [
        {
            chatId: {
                type: Schema.Types.ObjectId,
                ref: 'Chat'
            }
        }
    ]
});
exports.userModel = mongoose_1.default.model('User', userSchema);
