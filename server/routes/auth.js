const express = require('express');

const router = express.Router();

const { signup, signin, forgotPassword, resetPassword } = require('../controllers/auth.js');
router.get('/',(req,res)=>{
    return res.json({
        data: "hello from API"
    })
});

router.post('/signup',signup);
router.post('/login',signin);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);

module.exports = router;