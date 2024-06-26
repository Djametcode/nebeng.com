"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordCompare = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passwordCompare = (userInput, database) => {
    return bcrypt_1.default.compare(userInput, database);
};
exports.passwordCompare = passwordCompare;
