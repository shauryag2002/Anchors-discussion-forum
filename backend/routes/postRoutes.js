const express = require('express');
const Post = require('../model/PostModel');
const router = express.Router();

router.post('/topics', async (req, res) => {
    const { topic } = req.body;

    const newTopic = await Post.create({
        topic,
        userId: req.body.userId,
        username: req.body.username
    });

    await newTopic.save()
        .then(savedTopic => {
            res.status(201).json(savedTopic);
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to create a new topic' });
        });
});
router.get('/topics', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to get all posts' });
        });
});
router.post('/topics/:topicId/comments', (req, res) => {
    const { topicId } = req.params;
    const { comment, userId, username } = req.body;

    Post.findOne({ _id: topicId })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const newComment = {
                comment,
                userId,
                username
            };

            post.comments.push(newComment);

            post.save()
                .then(savedPost => {
                    res.status(201).json(savedPost);
                })
                .catch(error => {
                    res.status(500).json({ error: 'Failed to create a new comment' });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to find the post' });
        });
});
router.post('/topics/:topicId/comments/:commentId/replies', (req, res) => {
    const { topicId, commentId } = req.params;
    const { reply, userId, username } = req.body;

    Post.findOne({ _id: topicId })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const comment = post.comments.find(c => c._id.toString() === commentId);
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            const newReply = {
                reply,
                userId,
                username
            };

            comment.replies.push(newReply);

            post.save()
                .then(savedPost => {
                    res.status(201).json(savedPost);
                })
                .catch(error => {
                    res.status(500).json({ error: 'Failed to create a new reply' });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to find the post' });
        });
});

module.exports = router;
