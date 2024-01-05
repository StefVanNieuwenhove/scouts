"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userRouter = require('./user');
const campRouter = require('./camp');
const memberRouter = require('./member');
router.use('/user', userRouter);
router.use('/camp', campRouter);
router.use('/member', memberRouter);
module.exports = router;
