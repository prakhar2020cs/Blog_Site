import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');
    const existingUrl = data.get('url'); // Get the URL from formData

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get the token from cookies
    const cookieStore = await cookies();
    const token =  cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }).end(buffer);
    });

    // Connect to MongoDB and update user's profile
    await connectDB();
    const updatedUser = await Admin.findByIdAndUpdate(
      userId,
      { image: upload.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
console.log("mongodb upload success, url:", upload.secure_url);
    return NextResponse.json({ 
      success: true,
      url: upload.secure_url,
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        image: updatedUser.image
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: error }, { status: 500 });
  }
}
