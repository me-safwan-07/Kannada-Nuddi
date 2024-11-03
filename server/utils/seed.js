import chalk from "chalk";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import setupDB from "./db.js";
import User from "../models/User.js";
import { ROLES } from "../constants/index.js";

const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

const seedDB = async () => {
    try {
        console.log(`${chalk.blue('✓')} ${chalk.blue('Seed database started')}`);

        if (!email || !password) throw new Error("missing arguments");
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log(`${chalk.yellow('!')} ${chalk.yellow('Seeding admin user...')}`);
            const user = new User({
                email,
                password,
                // firstName: 'admin',
                // lastName: 'admin',
                role: ROLES.Admin
            });

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            await user.save();
            console.log(`${chalk.green('✓')} ${chalk.green('Admin user seeded.')}`);
        } else {
            console.log(`${chalk.yellow('!')} ${chalk.yellow('Admin user already exists, skipping seeding for admin user.')}`);
        }
    } catch (error) {
        console.log(`${chalk.red('x')} ${chalk.red('Error while seeding database')}`);
        console.log(error);
        return null;
    } finally {
        await mongoose.connection.close();
        console.log(`${chalk.blue('✓')} ${chalk.blue('Database connection closed!')}`);
    }
};

(async () => {
    try {
        await setupDB();
        await seedDB();
    } catch (error) {
        console.error(`Error initializing database: ${error.message}`);
        process.exit(1);
    }
})();