import connectDB from '@/lib/db';
import Blog from '@/models/Post';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { isValidObjectId, Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Middleware to verify JWT token
const verifyToken = async (req) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { error: 'No token provided', status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
};

export async function GET() {
  const auth = await verifyToken();
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  await connectDB();
  const posts = await Blog.find().sort({ createdAt: -1 });
  return Response.json({posts, success:true});
}

export async function POST(req) {
  await connectDB();
  const { title, description } = await req.json();

  try {
    const newPost = await Blog.create({ title, description });
    return Response.json({newPost, success:true}, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const auth = await verifyToken();
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    await connectDB();
    const { id, title, description } = await req.json();
    const objectId = Types.ObjectId.createFromHexString(id);

    if (!objectId) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    // First check if the blog belongs to the user
    const blog = await Blog.findOne({ _id: objectId, author: auth.userId });
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found or unauthorized' }, { status: 404 });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: objectId },
      { title, description },
      { new: true }
    );
    return NextResponse.json({ blog: updatedBlog, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating blogs", error }, { status: 500 });
  }
}

export async function DELETE(req) {
  const auth = await verifyToken();
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    await connectDB();
    const { id } = await req.json();
    const objectId = Types.ObjectId.createFromHexString(id);
    
    if (!objectId) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    // First check if the blog belongs to the user
    const blog = await Blog.findOne({ _id: objectId, author: auth.userId });
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found or unauthorized' }, { status: 404 });
    }

    await Blog.findOneAndDelete({ _id: objectId });
    return NextResponse.json({ message: 'Blog deleted successfully', success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting blog", error }, { status: 500 });
  }
}
      