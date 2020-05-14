const express = require('express');
const mongosse = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongosse.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = new User({email, password});
        await user.save();

        const token = jwt.sign({userId : user._id}, 'My-Secret-key')

        res.send({token});
    }
    catch(err) {
        return res.status(402).send(err.message);
    }
    
});

router.post('/signin', async (req, res) => {
    
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).send({error: 'Must provide Email and Password'})
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(422).send({error: 'Email or Password incorrect'});
    }

    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId : user._id}, 'My-Secret-key')
        return res.status(201).send({token});
    }
    catch (err){
        return res.status(422).send({error : 'Invalid Email or Password'});
    }

});

module.exports = router;