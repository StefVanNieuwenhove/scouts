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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create users
        const users = yield prisma.user.createMany({
            data: [
                {
                    name: 'Stef Van Nieuwenhove',
                    email: 'stef@scouts.be',
                    role: ['admin', 'rvb', 'jin'],
                    password: 'admin',
                },
                {
                    name: 'Ester podevyn',
                    email: 'ester@scouts.be',
                    role: ['groepsleiding', 'rvb', 'jonggiver'],
                    password: 'Groepsleiding',
                },
            ],
            skipDuplicates: true,
        });
        console.log(`Created ${users.count} users`);
        // Create camps
        const camps = yield prisma.camps.createMany({
            data: [
                {
                    name: 'overgangsweekend',
                    start_date: '2023-09-15T00:00:00.000Z',
                    end_date: '2023-09-17T00:00:00.000Z',
                    cost_per_day: 12.5,
                    total_days: 2,
                },
                {
                    name: 'paaskamp',
                    start_date: '2023-04-10T00:00:00.000Z',
                    end_date: '2023-04-13T00:00:00.000Z',
                    cost_per_day: 15,
                    total_days: 4,
                },
                {
                    name: 'zomerkamp_kort',
                    start_date: '2023-07-21T00:00:00.000Z',
                    end_date: '2023-07-26T00:00:00.000Z',
                    cost_per_day: 15,
                    total_days: 5,
                },
                {
                    name: 'zomerkamp_lang',
                    start_date: '2023-07-21T00:00:00.000Z',
                    end_date: '2023-07-30T00:00:00.000Z',
                    cost_per_day: 17.5,
                    total_days: 10,
                },
            ],
        });
        console.log(`Created ${camps.count} camps`);
        // Create members
        const members = yield prisma.members.createMany({
            data: [
                {
                    firstname: 'Janne',
                    lastname: 'De Rouck',
                    date_of_birth: '2011-03-17T00:00:00.000Z',
                    member_id: '2011031701958',
                    group: 'jonggivers',
                    national_number: '11031713425',
                },
            ],
            skipDuplicates: true,
        });
        console.log(`Created ${members.count} members`);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    //process.exit(1);
}));
