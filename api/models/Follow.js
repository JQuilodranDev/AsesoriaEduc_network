const moongose = require('mongoose');

const FollowShema = new.moongose.Schema(
    {
        user: {
            type: moongose.Schema.Types.ObjectId,
            ref: 'user'
        },
        followed: {
            type: moongose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    { timestamps: true},
    );
module.exports = moongose.model('follow', FollowShema);