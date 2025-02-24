import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!id) return; 
    axios.get(`${API_BASE_URL}/api/blog/${id}`)
    .then(res => setBlog(res.data))
    .catch(err => console.log(err));
}, [id]);

  if (!blog) return <h2>Loading...</h2>;

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/api/blog/${id}/comment`, { text: newComment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  return (
    <div>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <h3>Comments</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text} - {comment.username}</li>
            ))}
          </ul>
          <textarea value={newComment} className="form-control" onChange={(e) => setNewComment(e.target.value)}></textarea>
          <button  className="btn btn-primary w-50 mx-4 my-5" onClick={handleCommentSubmit}>Add Comment</button>
        </>
      ) : (
        <p>Loading blog...</p>
      )}
      
    </div>
  );
};

export default BlogDetail;
