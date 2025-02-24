import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import API_BASE_URL from "../config";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();

  const blogsPerPage = 6;
  const pagesVisited = pageNumber * blogsPerPage;




  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/blog/`) // Use Render backend URL
      .then((response) => {
        console.log("API Response:", response.data);
        setBlogs(response.data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog/")
      .then((response) => {
        console.log("API Response:", response.data);
        setBlogs(response.data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayBlogs = blogs
    .slice(pagesVisited, pagesVisited + blogsPerPage)
    .map((blog) => (
      <div key={blog._id} className="col-md-4 mb-4">
        <div className="card h-100 shadow">
          <img
            src={`https://picsum.photos/400/300?random=${blog._id}`}
            className="card-img-top"
            alt="Random"
            loading="lazy"
          />
          <div className="card-body">
            <h5 className="card-title">{blog.title || "Untitled Blog"}</h5>
            <p className="card-text">
              {blog.content?.substring(0, 100) || "No description available"}...
            </p>
            <a href={`/blog/${blog._id}`} className="btn btn-primary">
              Read More
            </a>
            <button
              className="btn btn-primary w-30 mx-2"
              onClick={() => navigate(`/edit-blog/${blog._id}`)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger w-30 mx-2"
              onClick={() => handleDelete(blog._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container mt-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4">Latest Blogs</h2>
      </motion.div>

      <div className="row">
        {blogs.length > 0 ? (
          displayBlogs
        ) : (
          <p className="text-center">Loading blogs...</p>
        )}
      </div>

      {blogs.length > blogsPerPage && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={Math.ceil(blogs.length / blogsPerPage)}
          onPageChange={changePage}
          containerClassName={"pagination justify-content-center mt-3"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
        />
      )}
    </div>
  );
};

export default Home;

//http://localhost:5000/api/blog/
