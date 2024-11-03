import mongoose from "mongoose";
import {  EMOPLOYEE_STATUS} from "../constants/index.js";

const EmployeeSchema = new mongoose.Schema({
    name: {
        typeof: "string",
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        default: EMOPLOYEE_STATUS.Waiting_Approval,
        enum: [
            EMOPLOYEE_STATUS.Waiting_Approval,
            EMOPLOYEE_STATUS.Rejected,
            EMOPLOYEE_STATUS.Approved
        ]
    },
    updated: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
