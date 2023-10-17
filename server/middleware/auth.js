"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    if (!req.cookies.token) {
        return res.status(401).json('Unauthorized');
    }
    next();
};
exports.auth = auth;
