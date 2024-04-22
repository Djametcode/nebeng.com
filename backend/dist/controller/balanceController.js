"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBalance = void 0;
const userModel_1 = require("../model/userModel");
const driverModel_1 = require("../model/driverModel");
const addBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topUpNominal, payment } = req.body;
    const userId = req.user.userId;
    const driverId = req.driver.driverId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            const driver = yield driverModel_1.driverModel.findOne({ _id: driverId });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.addBalance = addBalance;
