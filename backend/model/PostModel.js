const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    topic: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    comments: [
        {
            comment: {
                type: String
            },
            userId: {
                type: String
            },
            username: {
                type: String
            },
            replies: [
                {
                    reply: {
                        type: String
                    },
                    userId: {
                        type: String
                    },
                    username: {
                        type: String
                    }
                }
            ]
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
