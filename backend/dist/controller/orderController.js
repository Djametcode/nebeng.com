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
exports.getAllOrder = exports.cancleOrder = exports.createOrder = void 0;
const userModel_1 = require("../model/userModel");
const orderModel_1 = require("../model/orderModel");
const servicesModel_1 = require("../model/servicesModel");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { typeOrder, latitude, longitude, cashOnDelivery } = req.body;
    const requiredFields = ["typeOrder", "total", "createdBy", "createdDate", "latitude", "longitude", "cashOnDelivery"];
    for (const filed of requiredFields) {
        if (!req.body[filed]) {
            return res.status(400).json({ msg: `Please fill ${filed}` });
        }
    }
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        const servicesSelected = yield servicesModel_1.servicesModel.findOne({ _id: typeOrder });
        if (!user) {
            return res.status(401).json({ msg: "user not founde or token invalid" });
        }
        const totalOrder = servicesSelected === null || servicesSelected === void 0 ? void 0 : servicesSelected.price;
        const orderBlueprint = new orderModel_1.orderModel({
            typeOrder: typeOrder,
            total: totalOrder,
            createdBy: user._id,
            location: {
                latitude: latitude,
                longitude: longitude,
            },
            cashOnDelivery: cashOnDelivery
        });
        const order = yield orderModel_1.orderModel.create(orderBlueprint);
        user.order.push({ orderId: order._id });
        yield user.save();
        return res.status(200).json({ msg: "success", order });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createOrder = createOrder;
const cancleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const order = yield orderModel_1.orderModel.findOne({ _id: id });
        const checkOrderOwner = (order === null || order === void 0 ? void 0 : order.createdBy.toString()) === userId;
        if (!checkOrderOwner) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const deletedOrder = yield orderModel_1.orderModel.findOneAndDelete({ _id: id });
        const orderIndex = user.order.findIndex((item) => item.orderId === (deletedOrder === null || deletedOrder === void 0 ? void 0 : deletedOrder._id));
        console.log(orderIndex);
        if (orderIndex !== -1) {
            user.order.splice(orderIndex, 1);
            yield user.save();
            return res.status(200).json({ msg: "order successfully canceled" });
        }
        return res.status(400).json({ msg: "order already cancled" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.cancleOrder = cancleOrder;
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel_1.orderModel.find({ isComplete: false });
        return res.status(200).json({ msg: "success", order });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllOrder = getAllOrder;
