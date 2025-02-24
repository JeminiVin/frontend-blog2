import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import API_BASE_URL from "../config";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/api/blog/create`, { title, content }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(() => navigate("/"))
    
    .catch(err => console.log(err));
    if(navigate("/")){
      toast.success("blog created successfully")
    }
  };

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card p-4 shadow">
        <h2 className="text-center">Create a Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" required onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="4" required onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100">Create Blog</button>
        </form>
      </div>
    </div>
  </div>
</div>




  );
};

export default CreateBlog;
