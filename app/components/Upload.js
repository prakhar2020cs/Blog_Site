'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function ImageUpload({ url, blog }) {
  const [imageUrl, setImageUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

console.log("upload blog",blog);

const handleDelete = async () => {
  try {
    setIsLoading(true);
    setError('');

    const response = await fetch('/api/upload', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId: blog._id, cloudUrl:blog.image })
    });

    const data = await response.json();

    if (data.success) {
      setImageUrl(''); // Clear the image URL in the state
      console.log('Image deleted successfully');
      alert(data.message)
    } else {
      setError(data.message || 'Failed to delete image');
    }
  } catch (error) {
    console.error('Delete error:', error);
    setError('Failed to delete image');
  } finally {
    setIsLoading(false);
  }
};

  const handleUpload = async (e) => {
    console.log("upload blog clicked",blog._id);
    try {
      setIsLoading(true);
      setError('');
      
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', blog._id);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      
      if (data.success) {
        setImageUrl(data.url);
        if (data.user?.image) {
          Cookies.set('userImage', data.user.image, {
            expires: 1,
            sameSite: 'strict'
          });
        }
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload}
          disabled={isLoading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {isLoading && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <div className="relative">
            <img 
              src={imageUrl} 
              alt="Uploaded" 
              className="max-w-[300px] rounded-lg shadow-md"
            />
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
