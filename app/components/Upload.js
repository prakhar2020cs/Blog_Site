'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function ImageUpload({ url, blog }) {
  const [imageUrl, setImageUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

console.log("upload blog",blog);
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
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            className="max-w-[300px] rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}
