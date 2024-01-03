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
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camps = yield prisma.camps.findMany({
            orderBy: {
                start_date: 'desc',
            },
        });
        res.status(200).json(camps);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
router.get('/:id', middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const camp = yield prisma.camps.findUnique({
            where: {
                id: id,
            },
        });
        res.status(200).json(camp);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.post('/', [
    (0, express_validator_1.check)('name').isLength({ min: 5 }),
    (0, express_validator_1.check)('start_date').isDate(),
    (0, express_validator_1.check)('end_date').isDate(),
    (0, express_validator_1.check)('cost_per_day').isNumeric(),
    (0, express_validator_1.check)('total_days').isNumeric(),
], 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const camp = yield prisma.camps.create({
            data: Object.assign(Object.assign({}, req.body), { start_date: new Date(req.body.start_date), end_date: new Date(req.body.end_date) }),
        });
        res.status(200).json(camp);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camp = yield prisma.camps.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.status(200).json(camp);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camps = yield prisma.camps.deleteMany();
        res.status(200).json(camps);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camps = yield prisma.camps.delete({
            where: { id: req.params.id },
        });
        res.status(200).json(camps);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
module.exports = router;
