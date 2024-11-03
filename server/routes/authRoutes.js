import express from 'express'; 
import { facebookAuth, facebookAuth2, forgot, googleAuth, googleAuth2, login, register, reset, resetToken } from '../controllers/auth.Controller.js';
import passport from 'passport';
import { keys } from '../config/keys.js';

const router = express.Router();

// Routes for blog operations
router.post('/login', login ); 
router.post('/register', register );
router.post('/forgot', forgot );
router.post('/reset/:token', resetToken );
router.post('/reset', reset);
router.get('/google', googleAuth);
router.get(
    '/google/callback', 
    passport.authenticate('google', {
        failureRedirect: `${keys.app.clientURL}/login`,
        session: false
    }),
    googleAuth2
);
router.get('/facebook', facebookAuth);
router.get(
    '/facebook/callback', 
    passport.authenticate('facebook', {
        failureRedirect: `${keys.app.clientURL}/login`,
        session: false
    }),
    facebookAuth2
);

export default router;