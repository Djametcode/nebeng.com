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
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = require("../model/userModel");
const passwordHash_1 = require("../utils/passwordHash");
const passwordCompare_1 = require("../utils/passwordCompare");
const jwtGenerator_1 = require("../utils/jwtGenerator");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, address, gender } = req.body;
    const requiredFields = ['username', 'email', 'password', 'address', 'gender'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ msg: `Please fill ${field}` });
        }
    }
    try {
        const user = yield userModel_1.userModel.findOne({ $or: [{ username: username }, { email: email }] });
        if (user) {
            return res.status(400).json({ msg: "username or email already used" });
        }
        if (!password) {
            return res.status(400).json({ msg: "Please fill password" });
        }
        const hashedPassword = yield (0, passwordHash_1.hashPassword)(password);
        console.log(hashedPassword);
        if (gender !== "Laki - Laki" && gender !== 'Perempuan') {
            return res.status(400).json({ msg: "LGBT not allowed go to hell" });
        }
        const userBlueprint = new userModel_1.userModel({
            username: username,
            email: email,
            password: hashedPassword,
            gender: gender,
            address: address
        });
        const newUser = yield userModel_1.userModel.create(userBlueprint);
        return res.status(200).json({ msg: "success register", newUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ msg: "Please fill email" });
    }
    try {
        const user = yield userModel_1.userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "email not registered" });
        }
        if (!password) {
            return res.status(400).json({ msg: "please fill password" });
        }
        const isPassMatch = yield (0, passwordCompare_1.passwordCompare)(password, user.password);
        console.log(isPassMatch);
        if (!isPassMatch) {
            return res.status(401).json({ msg: "password wrong" });
        }
        const token = (0, jwtGenerator_1.jwtTokenGenerator)({
            userId: user._id.toString(),
            email: user.email,
            username: user.username
        });
        return res.status(200).json({ msg: "success login", user, token });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.loginUser = loginUser;
