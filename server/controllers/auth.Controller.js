import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import passport from "passport";

import auth from "../middleware/auth.js";

import User from "../models/User.js";
import { keys } from '../config/keys.js';
import { EMAIL_PROVIDER } from '../constants/index.js'

const { secret, tokenLife } = keys.jwt;

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }

        if (!password) {
            return res
                .status(400)
                .json({ error: 'You must enter a password.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // if (user && user.provider !== EMAIL_PROVIDER.Email) {
        //         return res.status(400).send({
        //         error: `That email address is already in use using ${user.provider} provider.`
        //     });
        // }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                error: 'Invalid email or password.'
            });
        }

        const payload = {
            id: user.id
        };

        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

        if (!token) {
            throw new Error('Failed to generate JWT token.');
        }

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        return next(`Your request could not be processed. Please try again. Error: ${err.message}`);
    }    
};

export const register = async (req, res, next) => {
    try {
        const { email, firstName, lastName, password, isSubscribed } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' 
            });
        }
    
        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'You must enter your full name.' });
        }
    
        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }
    
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
            return res
            .status(400)
            .json({ error: 'That email address is already in use.' });
        }

        let subscribed = false;
        if (isSubscribed) {
            const result = await mailchimp.subscribeToNewsletter(email);

            if (result.status === 'subscribed') {
                subscribed = true;
            }
        }

        const user = new User({
            email,
            password,
            firstName,
            lastName
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        const registered = await user.save();

        const payload = {
            id: registered.id
        }

        // await mailgun.sendEmail(
        //     registeredUser.email,
        //     'signup',
        //     null,
        //     registeredUser
        // );

        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

        if (!token) {
            throw new Error('Failed to generate JWT token.');
        }

        res.status(201).json({
            success: true,
            subscribed,
            token: `Bearer ${token}`,
            user: {
                id: registered.id,
                email: registered.email,
                firstName: registered.firstName,
                lastName: registered.lastName,
                role: registered.role,
                subscribed
            }
        });
    } catch (err) {
        next('Your request could not be processed. Please try again.');
        console.error(err);
        return;
    }
};

export const forgot = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res
                .status(400)
                .send({ error: 'No user found for this email address.' });
        }

        const buffer = crypto.randomBytes(48);
        const resetToken = buffer.toString('hex');

        existingUser.resetPasswordToken = resetToken;
        existingUser.resetPasswordExpires = Date.now() + 3600000;

        await existingUser.save();

        // await mailgun.sendEmail(
        //     existingUser.email,
        //     'reset',
        //     req.headers.host,
        //     resetToken
        // );

        res.status(200).json({
            success: true,
            message: 'Please check your email for the link to reset your password.'
        });
    } catch (error) {
        next('Your request could not be processed. Please try again')
    }
};

export const resetToken = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'You must enter a new password.' });
        }

        const resetUser = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!resetUser) {
            return res.status(400).json({
                error:
                'Your token has expired. Please attempt to reset your password again.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        resetUser.password = hash;
        resetUser.resetPasswordToken = undefined;
        resetUser.resetPasswordExpires = undefined;

        await resetUser.save();

        // await mailgun.sendEmail(resetUser.email, 'reset-confirmation');

        res.status(200).json({
        success: true,
        message:
            'Password changed successfully. Please login with your new password.'
        });
    } catch (error) {
        next(" Your request could not be processed. Please try again.")
    };
};

export const reset = async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body;
        const email = req.user.email;

        if (!email) {
            return res.status(401).send('Unauthenticated');
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res
                .status(400)
                .json({ error: 'That email address is already in use.' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
        return res
            .status(400)
            .json({ error: 'Please enter your correct old password.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(confirmPassword, salt);
        existingUser.password = hash;
        await existingUser.save();

        // await mailgun.sendEmail(existingUser.email, 'reset-confirmation');

        res.status(200).json({
            success: true,
            message:
                'Password changed successfully. Please login with your new password.'
            }); 
    } catch (error) {
        next("Your request could not be processed. Please try again.");
    };
};  

export const googleAuth = passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    accessType: 'offline',
    approvalPrompt: 'force'
});

export const googleAuth2 = (req, res, next) => {
    const payload = {
        id: req.user.id
    };

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
    const jwtToken = `Bearer ${token}`;
    res.redirect(`${keys.app.clientURL}/auth/success?token=${jwtToken}`);
};

export const facebookAuth = passport.authenticate('facebook', {
    session: false,
    scope: ['public_profile', 'email']
});

export const facebookAuth2 = (req, res, next) => {
    const payload = {
        id: req.user.id
    };

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
    const jwtToken = `Bearer ${token}`;
    res.redirect(`${keys.app.clientURL}/auth/success?token=${jwtToken}`); 
}
