"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const JWT_TOKEN = process.env.JWT_TOKEN || '';
const auth = (req, res, next) => {
    if (!req.cookies[JWT_TOKEN]) {
        return res.status(401).json({ error: 'Not authorized' });
    }
    next();
};
exports.auth = auth;
