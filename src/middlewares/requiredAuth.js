const jwt = require('jsonwebtoken');
const mongosse = require('mongoose');
const User = mongosse.model('User');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).send('You must be logged.');
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, 'My-Secret-key', async (err, payload) => {
        if(err){
            return res.status(401).send('You must be logged.');
        }
        const {userId} = payload;
        const user = await User.findById(userId);

        req.user = user;
        next();
    });

};