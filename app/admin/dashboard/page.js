"use client";

import CreateBlogModal from "@/app/components/CreateBlogModal";
import DeleteBlogModal from "@/app/components/DeleteBlogModal";
import EditBlogModal from "@/app/components/EditBlogModal";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const[flag, setFlag] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadBlogs, setLoadBlogs] = useState(false);
  const [error, setError] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

// useEffect(()=>{
//   const token = Cookies.get('token');
//   if(!token){
//     router.push('/login');
//   }
// },[])

  const handleCreateBlog = async (blogData) => {
    console.log("handle create blog",blogData);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) {
        throw new Error("Failed to create blog");
      }

      const data = await res.json();

      if (data.success) {
        setLoadBlogs(!loadBlogs);
        alert("Blog Created");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog");
    }

    closeModal();
  };

  const handleEditBlog = async (blog) => {
    console.log("editing blog")
    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: blog._id,
        title: blog.title,
        description: blog.description,
      }),
    });

   
    let updatedBlog = await res.json();
    console.log("updated Blog", updatedBlog);
    updatedBlog.success
      ? alert("Blog updated")
      : alert("error updating Blog");
      setLoadBlogs(!loadBlogs);
    closeEditModal();
  };

  useEffect(() => {
    getBlogs();
  }, [loadBlogs]);

  const handleLogout = () => {
    // Delete the token cookie
    Cookies.remove('token');
    // Redirect to login page
    router.push('/login');
  };

useEffect(()=>{
if(flag === "delete"){
  openDeleteModal()
}
},[currentBlog])

  async function getBlogs() {
    console.log("getting blogs..");

    try {
      const res = await fetch("/api/blog");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      if(data.success){
        console.log("blogs fetched successfully");
      }
      setBlogs(data.posts);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteBlog = async () => {
 console.log("handle Delete Blog" , currentBlog)  

    try {
      const res = await fetch('/api/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentBlog._id }),
      });

      const data = await res.json();
      
      if(data.success){
        alert("Blog deleted successfully");
        setLoadBlogs(!loadBlogs);
      }else{
        alert("Error deleting blog");
      }

    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

 

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-white text-xl font-bold">
                  Admin Dashboard
                </h1>
              </div>
              <div className="ml-6 flex items-center">
                <a
                  href="/"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 rounded-md text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Blog Management
            </h2>
            <button
              onClick={()=>openModal()}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Blog
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <CreateBlogModal
          isOpen={isModalOpen}
          onClose={closeModal}
          handleCreateBlog={handleCreateBlog}
        />

        <EditBlogModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={handleEditBlog}
          initialData={currentBlog}
        />
        <DeleteBlogModal
         isOpen={isDeleteModalOpen}
         onClose={closeDeleteModal}
         onSubmit={handleDeleteBlog}
         initialData={currentBlog}
        />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg> 
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((blog) => (
              <div
                key={blog._id}
                className="blog-card bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900 truncate flex-1">
                      {blog.title}
                    </h3>
                    {/* {!blog.published && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      )} */}
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {blog.description}
                  </p>
                  <p className="mt-3 text-xs text-gray-400">
                    Created: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {

                      setCurrentBlog(blog);
                      console.log("current blog",currentBlog);
                      openEditModal();
                    }}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>{ 
                      setCurrentBlog(blog);
                      setFlag("delete");
                   
                    }}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {blogs.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <p className="mt-2 text-gray-500">
                  No blogs found. Create your first blog post!
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Blog Form Modal */}
      {/* <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentBlog ? 'Edit Blog' : 'Create New Blog'}
        >
          <BlogForm
            blog={currentBlog}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </Modal> */}

      {/* Delete Confirmation Modal */}
      {/* <Modal
          isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          title="Confirm Delete"
        >
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleDeleteBlog}
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setConfirmDelete(null)}
            >
              Cancel
            </button>
          </div>
        </Modal> */}
    </div>
  );
}
