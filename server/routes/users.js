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
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const SALT = process.env.SALT_ROUNDS || 10;
const JWT_SECRET = process.env.JWT_SECRET || 'uzihdauhfkjerhkfjhkzjrhfkjerhfk';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const JWT_ISSUER = process.env.JWT_ISSUER || 'scouts-server';
const JWT_TOKEN = process.env.JWT_TOKEN || 'token';
const NODE_ENV = process.env.NODE_ENV || 'development';
router.get('/', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get('/:id', middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.post('/register', [
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
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be between 6 and 20 characters'),
    (0, express_validator_1.check)('role')
        .notEmpty()
        .withMessage('Role is required')
        .trim()
        .isIn([
        client_1.User_role.admin,
        client_1.User_role.kapoen,
        client_1.User_role.wouter,
        client_1.User_role.jonggiver,
        client_1.User_role.giver,
        client_1.User_role.jin,
        client_1.User_role.board,
        client_1.User_role.parent,
    ]),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.array().length > 0) {
            console.log(errors);
            return res.status(500).json({ 'Errors in validation': errors.array() });
        }
        const { name, email, password, role } = req.body;
        const userExists = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists !== null) {
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
    catch (err) {
        console.log(err);
        res.status(500).json(err);
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
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be between 6 and 20 characters'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.array().length > 0) {
            console.log('Validation ', errors);
            return res.status(500).json('Errors in validation');
        }
        const { email, password } = req.body;
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
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
            issuer: JWT_ISSUER,
        });
        res.cookie(JWT_TOKEN, token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
        });
        console.log({ user: user, token: token });
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie(JWT_TOKEN);
        res.status(200).json('User logged out');
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
module.exports = router;
