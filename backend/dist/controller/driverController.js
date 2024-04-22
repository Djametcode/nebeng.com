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
exports.loginDriver = exports.registerDriver = void 0;
const driverModel_1 = require("../model/driverModel");
const passwordHash_1 = require("../utils/passwordHash");
const passwordCompare_1 = require("../utils/passwordCompare");
const jwtGenerator_1 = require("../utils/jwtGenerator");
const registerDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, phone } = req.body;
    const requiredFields = ["email", "password", "firstName", "lastName", "phone"];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ msg: `please fill ${field}` });
        }
    }
    try {
        const driverExist = yield driverModel_1.driverModel.findOne({ email: email });
        if (driverExist) {
            return res.status(400).json({ msg: "email already used" });
        }
        const hashedPassword = yield (0, passwordHash_1.hashPassword)(password);
        console.log(passwordHash_1.hashPassword);
        const driverPhone = String(phone);
        if (!driverPhone.startsWith("08")) {
            return res.status(400).json({ msg: "please fill phone number starts with 08" });
        }
        if (driverPhone.length >= 13) {
            return res.status(400).json({ msg: "max phone number length is 13" });
        }
        const formattedPhone = "+62" + driverPhone.slice(1, driverPhone.length - 1);
        console.log(formattedPhone);
        const driverBlueprint = new driverModel_1.driverModel({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            phone: formattedPhone
        });
        const driver = yield driverModel_1.driverModel.create(driverBlueprint);
        return res.status(200).json({ msg: "success", driver });
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerDriver = registerDriver;
const loginDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ msg: "please provide email" });
        }
        const driverExist = yield driverModel_1.driverModel.findOne({ email: email });
        if (!driverExist) {
            return res.status(404).json({ msg: "driver not regsitered" });
        }
        const isPassCorrect = yield (0, passwordCompare_1.passwordCompare)(password, driverExist.password);
        console.log(isPassCorrect);
        if (!isPassCorrect) {
            return res.status(401).json({ msg: "password wrong" });
        }
        const token = (0, jwtGenerator_1.jwtTokenGenerator)({
            userId: driverExist._id.toString(),
            email: driverExist.email
        });
        return res.status(200).json({ msg: "successs", driverExist, token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginDriver = loginDriver;
