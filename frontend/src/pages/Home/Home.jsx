import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./Home.css"
const Home = () => {
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()
    const getPosts = async () => {
        try {
            const res = await fetch("https://anchors-discussion-forum-backend.vercel.app/post/topics", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json()
            if (data.error) {
                console.log(data.error)
            }
            else {
                setTopics(data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getPosts();
        const username = localStorage.getItem("username")
        const id = localStorage.getItem("id")
        const email = localStorage.getItem("email")
        if (!username || !id || !email) {
            navigate("/login")
        }
    }, [])
    const [postInp, setPostInp] = useState("")
    const handleSubmit = async () => {
        if (!postInp) return alert("Please enter a topic")
        try {
            const res = await fetch("https://anchors-discussion-forum-backend.vercel.app/post/topics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: postInp,
                    username: localStorage.getItem("username"),
                    userId: localStorage.getItem("id")
                })
            })
            const data = await res.json()
            if (data.error) {
                console.log(data.error)
            }
            else {
                setTopics([...topics, data])
                setPostInp("")
                getPosts();
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const submitComment = async (id) => {
        try {
            const res = await fetch(`https://anchors-discussion-forum-backend.vercel.app/post/topics/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment: document.getElementById(id).value,
                    username: localStorage.getItem("username"),
                    userId: localStorage.getItem("id")
                })
            })
            const data = await res.json()
            if (data.error) {
                console.log(data.error)
            }
            else {
                getPosts();
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const replyComment = async (topicId, commentId) => {
        try {
            const res = await fetch(`https://anchors-discussion-forum-backend.vercel.app/post/topics/${topicId}/comments/${commentId}/replies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reply: document.getElementById(commentId).value,
                    username: localStorage.getItem("username"),
                    userId: localStorage.getItem("id")
                })
            })
            const data = await res.json()
            if (data.error) {
                console.log(data.error)
            }
            else {
                getPosts();
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='home'>
            <div className="inputPost">
                <textarea placeholder="Tell your Suggestions..." className="inputText" value={postInp} onChange={(e) => setPostInp(e.target.value)} ></textarea>
                <button className="inputPostButton" onClick={handleSubmit}>Post</button>
            </div>
            {topics.map((topic, i) => {
                return <div className='post'>
                    <div className="postUsername">{topic.username}</div>
                    <hr />
                    <div className="text wrapperComment">{topic.topic}</div>
                    <div className="comments">
                        <div className="reply">
                            <input type="text" className='replyInp' id={topic._id}
                            />
                            <button className='submit' onClick={() => submitComment(topic._id)}>Comment</button>
                        </div>
                        <hr />
                        {topic.comments.map((comment, j) => {
                            return <div className="comment">
                                <div className="commentText"><div className="wrapper">
                                    <div className="replyName">
                                        {comment.username}
                                    </div>
                                    <div className="wrapperComment">

                                        {comment.comment}
                                    </div>
                                    <div className="reply">
                                        <input type="text" className='replyInp' id={comment._id} />
                                        <button className='submit' onClick={() => replyComment(topic._id, comment._id)}>Reply</button>
                                    </div>
                                    {comment.replies.map((reply, k) => {
                                        return <div className="replyText">
                                            <div className="replyName">
                                                {reply.username}
                                            </div>
                                            <div className="wrapperComment2">
                                                {reply.reply}
                                            </div>
                                        </div>
                                    })}
                                </div>

                                </div>

                                <hr />
                            </div>
                        })}
                    </div>
                </div>
            })}

        </div>
    )
}

export default Home;
