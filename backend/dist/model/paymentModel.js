"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var Provider;
(function (Provider) {
    Provider["bank"] = "bank";
    Provider["ovo"] = "ovo";
    Provider["gopay"] = "gopay";
    Provider["dana"] = "dana";
})(Provider || (Provider = {}));
var Epayment;
(function (Epayment) {
    Epayment["topUp"] = "top Up";
    Epayment["paymentServices"] = "bayar";
})(Epayment || (Epayment = {}));
const paymentSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        refPath: 'createdByType'
    }
});
