const mongosse =  require('mongoose');

const pointSchema = new mongosse.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
});

const trackSchema = new mongosse.Schema({

    userId : {
        type : mongosse.Schema.Types.ObjectId,
        ref: 'User'
    },
    name : {
        type : String,
        required : true
    },
    locations : [pointSchema]
});

mongosse.model('Track', trackSchema);