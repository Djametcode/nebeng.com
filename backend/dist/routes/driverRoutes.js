"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const express_1 = __importDefault(require("express"));
const driverController_1 = require("../controller/driverController");
const router = express_1.default.Router();
router.post('/register', driverController_1.registerDriver);
router.post('/login', driverController_1.loginDriver);
exports.driverRouter = router;
