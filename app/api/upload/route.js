import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import connectDB from '@/lib/db';
import Blog from '@/models/Post';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { isValidObjectId, Types } from 'mongoose';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');
    const blogId = data.get('id'); // Get the blog ID from formData

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    // Get the token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return NextResponse.json({ message: 'Invalid Token' }, { status: 404 });

    }
    console.log("Blog Id to uploaded image ", blogId);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }).end(buffer);
    });

    console.log("cloudinary upload url", upload.secure_url);

    // Connect to MongoDB and update the blog post
    await connectDB();
    const objectId = Types.ObjectId.createFromHexString(blogId);
    console.log("object id",objectId );
    const updatedBlog = await Blog.findByIdAndUpdate(
        objectId,
      { image: upload.secure_url },
      { new: true }
    );

    console.log("upload state of MongoDB", updatedBlog);

    if (!updatedBlog) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    console.log("mongodb upload success, url:", upload.secure_url);

    return NextResponse.json({ 
      success: true,
      url: upload.secure_url,
      blog: {
        id: updatedBlog._id,
        image: updatedBlog.image
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: error }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const {blogId, cloudUrl} = await req.json()

    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    // Get the token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 404 });
    }

    // Connect to MongoDB
    await connectDB();

    // Convert string ID to ObjectId
    const objectId = Types.ObjectId.createFromHexString(blogId);
    console.log("Deleting image for blog ID:", objectId);

    // Delete from Cloudinary if URL exists
    if (cloudUrl) {
      try {
        // Extract public_id from Cloudinary URL
     
        const urlParts = cloudUrl.split('/');
const uploadIndex = urlParts.indexOf('upload');

if (uploadIndex !== -1) {
  let publicIdParts = urlParts.slice(uploadIndex + 1);

  // Remove version if present (e.g., v1747911635)
  if (publicIdParts[0].match(/^v\d+$/)) {
    publicIdParts = publicIdParts.slice(1);
  }

  const publicIdWithExt = publicIdParts.join('/');
  const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');

  console.log("Trying to delete publicId:", publicId); // should be just image/folder path without version or extension

  const cloudinaryResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error('Cloudinary delete error:', error);
        reject(error);
      } else {
        console.log('Cloudinary delete result:', result);
        resolve(result);
      }
    });
  });

  if (cloudinaryResult.result !== 'ok') {
    return NextResponse.json({ message: 'Failed to delete from Cloudinary' }, { status: 500 });
  }
}


      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
        // Continue with MongoDB update even if Cloudinary delete fails
      }
    }

    // Update the blog post to remove the image
    const updatedBlog = await Blog.findByIdAndUpdate(
      objectId,
      { image: "" }, // Set image to empty string
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Image removed successfully',
      blog: {
        id: updatedBlog._id,
        image: updatedBlog.image
      }
    });
    

  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json({ error: 'Failed to remove image', details: error }, { status: 500 });
  }
}


