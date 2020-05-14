const express = require('express');
const mongosse = require('mongoose');
const requireAuth = require('../middlewares/requiredAuth');
const Track = mongosse.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) =>{

    const tracks = await Track.find({ userId: req.user._id});

    return res.status(201).send(tracks);
});

router.post('/tracks', async (req, res) => {

    const {name, locations} = req.body;

    if(!name || !locations){
        
        return res.status(422).send({error: 'Must provide Name and Locations'});
    
    }
    try{
        const track = new Track({name, locations, userId: req.user._id});
        await track.save(); 
        return res.status(201).send(track);
    }
    catch (err){
        return res.status(422).send({error : err});
    }
});

module.exports = router;