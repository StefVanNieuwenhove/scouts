"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Not authorized' });
    }
    next();
};
exports.auth = auth;
