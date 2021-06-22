const moongoose = require('mongoose');

const MessageSchema = new.moongoose.Schema({
    emitter: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    recevier: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    text: {
        type: String,
        required: true,
    },
    created_At: {
        type: String,
        required: true,
    }
},
    { timestamps: true},
    );

module.exports = moongoose.model('message', MessageSchema);