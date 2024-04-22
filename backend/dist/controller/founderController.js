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
exports.updatePriceServices = exports.disableServices = exports.createServices = void 0;
const servicesModel_1 = require("../model/servicesModel");
const createServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, price } = req.body;
    if (!type || !price) {
        return res.status(400).json({ msg: "services type need to fill" });
    }
    try {
        const servicesBlueprint = new servicesModel_1.servicesModel({
            type: type,
            price: price
        });
        const services = yield servicesModel_1.servicesModel.create(servicesBlueprint);
        return res.status(200).json({ msg: "success", services });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createServices = createServices;
const disableServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isAvailable } = req.body;
    try {
        const services = yield servicesModel_1.servicesModel.findOneAndUpdate({ _id: id }, { isAvailable: isAvailable }, { new: true });
        if (!services) {
            return res.status(404).json({ msg: "services not found" });
        }
        return res.status(200).json({ msg: "success", services });
    }
    catch (error) {
        console.log(error);
    }
});
exports.disableServices = disableServices;
const updatePriceServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { updatePrice } = req.body;
    try {
        const services = yield servicesModel_1.servicesModel.findOneAndUpdate({ _id: id }, { price: updatePrice }, { new: true });
        if (!services) {
            return res.status(404).json({ msg: "services not found" });
        }
        return res.status(200).json({ msg: "success", services });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePriceServices = updatePriceServices;
