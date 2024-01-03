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
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield prisma.members.findMany();
        members.forEach((member) => {
            member.national_number = (0, middleware_1.decrypt)(member.national_number);
        });
        res.status(200).json(members);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
router.get('/:id', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const member = yield prisma.members.findUnique({
            where: {
                id: id,
            },
        });
        if (!member) {
            return res.status(500).json('Member not found');
        }
        const decryptedNationalNumber = (0, middleware_1.decrypt)(member.national_number);
        res
            .status(200)
            .json(Object.assign(Object.assign({}, member), { national_number: decryptedNationalNumber }));
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.get('/group/:group', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { group } = req.params;
        if (!Object.values(client_1.Lid_tak).includes(group)) {
            return res.status(500).json('Invalid group');
        }
        const members = yield prisma.members.findMany({
            where: {
                group: {
                    equals: group,
                },
            },
        });
        members.forEach((member) => {
            member.national_number = (0, middleware_1.decrypt)(member.national_number);
        });
        res.status(200).json(members);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.post('/', [
    (0, express_validator_1.check)('member_id')
        .isString()
        .isLength({ min: 13, max: 13 })
        .notEmpty()
        .withMessage('Member ID is required'),
    (0, express_validator_1.check)('firstname')
        .isString()
        .notEmpty()
        .isLength({ min: 5, max: 20 })
        .withMessage('Firstname is required'),
    (0, express_validator_1.check)('lastname')
        .isString()
        .notEmpty()
        .isLength({ min: 5, max: 50 })
        .withMessage('Lastname is required'),
    (0, express_validator_1.check)('date_of_birth')
        .isDate()
        .notEmpty()
        .withMessage('Date of birth is required'),
    (0, express_validator_1.check)('group').isIn(Object.values(client_1.Lid_tak)),
    (0, express_validator_1.check)('national_number')
        /*  .isPassportNumber('BE') */
        .notEmpty()
        .withMessage('National number is required'),
], 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res.status(500).json(result.array());
        }
        const exists = yield prisma.members.findUnique({
            where: {
                member_id: req.body.member_id,
            },
        });
        if (exists) {
            return res.status(500).json('Member already exists');
        }
        const encryptedNationalNumber = (0, middleware_1.encrypt)(req.body.national_number);
        console.log(encryptedNationalNumber);
        if (!encryptedNationalNumber) {
            return res.status(500).json('Failed to encrypt national number');
        }
        const member = yield prisma.members.create({
            data: Object.assign(Object.assign({}, req.body), { date_of_birth: new Date(req.body.date_of_birth), national_number: encryptedNationalNumber }),
        });
        res.status(200).json(member);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.put('/:id', [
    (0, express_validator_1.check)('member_id').isString().isLength({ min: 13, max: 13 }).optional(),
    (0, express_validator_1.check)('firstname').isString().isLength({ min: 5, max: 20 }).optional(),
    (0, express_validator_1.check)('lastname').isString().isLength({ min: 5, max: 50 }).optional(),
    (0, express_validator_1.check)('date_of_birth').isDate().optional(),
    (0, express_validator_1.check)('group').isIn(Object.values(client_1.Lid_tak)).optional(),
    (0, express_validator_1.check)('national_number').isPassportNumber('BE').optional(),
] /* auth, */, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const member = yield prisma.members.update({
            where: {
                id: id,
            },
            data: Object.assign(Object.assign({}, req.body), { date_of_birth: new Date(req.body.date_of_birth) }),
        });
        res.status(200).json(member);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.delete('/:id', 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const member = yield prisma.members.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json(member);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
module.exports = router;
