const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function authToken (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/anime-list', authToken, (req, res) => {
    res.send('Working');
});

module.exports = router;