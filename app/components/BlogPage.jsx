"use client"
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';


// Blog Card Component
const BlogCard = ({ image, title, level, description, readMoreLink, onReadMoreClick }) => {
  return (
    <div className="bg-[#000000] overflow-hidden w-[421px] h-[597px] rounded-[15px] relative font-afacad">
      <img
        src={image || "/api/placeholder/400/250"}
        alt={title}
        className="absolute"
        style={{
          width: '373px',
          height: '210px',
          top: '30px',
          left: '23px',
          objectFit: 'cover'
        }}
      />
      <div className="p-6 pt-[260px]">
        <h3
          className="mb-2"
          style={{
            color: '#DFB6B2',
            fontSize: '30px',
            fontFamily: 'Afacad, sans-serif',
          }}
        >
          {title}
        </h3>
        {level && (
          <p
            className="mb-2"
            style={{
              color: '#DFB6B2',
              fontSize: '30px',
              fontFamily: 'Afacad, sans-serif',
            }}
          >
            {level}
          </p>
        )}
        <p
          className="mb-4"
          style={{
            color: 'rgba(251, 229, 216, 0.68)',
            fontSize: '18px',
            fontFamily: 'Afacad, sans-serif',
          }}
        >
          {description}
        </p>
        <span
          onClick={onReadMoreClick}
          className="inline-block font-semibold"
          style={{
            background: 'linear-gradient(90deg, #532959 0%, #824D69 50%, #DFB6B2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            MozBackgroundClip: 'text',
            MozTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          Read More
        </span>
      </div>
    </div>
  );
};

// Main Blog Page Component
const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blog',{
        method: 'POST',
        body: JSON.stringify({ getPublicBlogs: true }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await res.json();
      
      if (data.success) {
        setBlogs(data.posts);
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchBlogs();
}, []); 

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
  const logo = null;

  return (
    <div className="min-h-screen flex flex-col bg-[#180018]">
      <Navbar logo={logo} />
      <main className="flex-grow pt-[190px]">
        <div className="text-center py-16 gap-34px">
          <h1 className="text-[70px] md:text-5xl font-bold text-white mb-4">Blogs</h1>
          <p className="text-[#FBE5D8] text-[25px] max-w-8xl mx-auto px-4 mt-12 font-afacad ">
            Read more about latest news from Expanish destinations, or get tips on how to prepare to study Spanish at our language schools.
          </p>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '47px' }}>
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
        ) : ( blogs.map((post, index) => (
              <BlogCard
                key={index}
                image={post.image}
                title={post.title}
                description={post.description}
                onReadMoreClick={post.onReadMoreClick || (() => alert('Read more coming soon!'))}
              />
            )))}
          </div>
        </div>
      </main>
      <Footer logo={logo} />
    </div>
  );
};

export default BlogPage;
