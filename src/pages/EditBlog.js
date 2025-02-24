import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import API_BASE_URL from "../config";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/api/blog/${id}`, blog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
      toast.success("updated successfully!")
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Blog</h2>
      <input type="text" className="form-control" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} /><br/>
      <textarea className="form-control" value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })}></textarea><br/>
      <button className="btn btn-success w-40 mx-4"onClick={handleUpdate}>Update Blog</button>
    </div>
  );
};

export default EditBlog;
