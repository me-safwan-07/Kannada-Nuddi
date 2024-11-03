import mongoose, { Schema } from "mongoose";
import { EMAIL_PROVIDER, ROLES } from "../constants/index.js";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    firstName: {
        type: String,
    },
    lastname: {
        type: String,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    role: {
        type: String,
        default: ROLES.Guest,
        enum: [ROLES.Admin, ROLES.User, ROLES.Employee, ROLES.Guest]
    },
    provider: {
        type: String,
        required: true,
        default: EMAIL_PROVIDER.Email
    },
    googleId: String,
    facebookId: String,
    subscribed: {
        type: Boolean,
        default: false // By default, users are not subscribed to email notifications
    },
    permissions: {
        type: [String],
        default: ["view"] // Allows basic view access for guests
    },
});

const User = mongoose.model('User', UserSchema);

export default User;
