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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_TOKEN = process.env.JWT_TOKEN;
const NODE_ENV = process.env.NODE_ENV;
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const include = req.query.include_password;
        const users = yield prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                password: include === 'true' ? true : false,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/roles', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = Object.values(client_1.User_role);
        res.status(200).json(roles);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/role/:role', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!Object.values(client_1.User_role).includes(req.params.role)) {
            return res.status(500).json('Invalid role');
        }
        const users = yield prisma.user.findMany({
            where: {
                role: {
                    has: req.params.role,
                },
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/:id', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const include = req.query.include_password;
        const user = yield prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                password: include === 'true' ? true : false,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post('/register' /* auth, */, [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be between 3 and 20 characters'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Email is required').trim(),
    (0, express_validator_1.check)('password')
        .notEmpty()
        .withMessage('Password is required')
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage('Password must be between 5 and 20 characters'),
    (0, express_validator_1.check)('role')
        .notEmpty()
        .withMessage('Role is required')
        .trim()
        .isIn(Object.values(client_1.User_role)),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            console.log(result.array());
            return res.status(500).json(result.array());
        }
        const { name, email, password, role } = req.body;
        const userExists = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists) {
            return res.status(500).json('User already exists');
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(SALT));
        const user = yield prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.post('/login', [
    (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Email is required')
        .trim()
        .normalizeEmail(),
    (0, express_validator_1.check)('password')
        .notEmpty()
        .withMessage('Password is required')
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage('Password must be between 6 and 20 characters'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res.status(500).json(result.array());
        }
        const { email, password } = req.body;
        const includeToken = req.query.include_token;
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user === null) {
            console.log('User does not exist');
            return res.status(500).json('User does not exist');
        }
        const validPassword = bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(500).json('Invalid password');
        }
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
            issuer: JWT_ISSUER,
        });
        if (includeToken === 'true') {
            res.cookie(JWT_TOKEN, token, {
                httpOnly: true,
                secure: NODE_ENV === 'production',
            });
        }
        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: includeToken === 'true' ? token : '',
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}));
router.put('/:id', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.delete('/logout', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie(JWT_TOKEN);
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.delete('/:id', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.delete({
            where: { id: req.params.id },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
module.exports = router;
