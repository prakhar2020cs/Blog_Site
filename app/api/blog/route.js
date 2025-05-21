import connectDB from '@/lib/db';
import Blog from '@/models/Post';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { isValidObjectId, Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

// Middleware to verify JWT token
const verifyToken = async (req) => {
  try {
    // console.log("verifying Token..");
    const cookieHeader = req.headers.get('cookie');
    // console.log("cookie header:", cookieHeader);

    if (!cookieHeader) {
      console.log("No cookie header found");
      return { error: 'No token provided', status: 401 };
    }

    const cookies = parse(cookieHeader);
    // console.log("parsed cookies:", cookies);
    
    const token = cookies.token;
    // console.log("token from cookie:", token);

    if (!token) {
      console.log("No token found in cookies");
      return { error: 'No token provided', status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded token:", decoded);
    if(!decoded){
      return { error: 'invalid token', status: 401 };
    }
    
    return { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    console.error("Token verification error:", error);
    return { error: 'Token Verification Error', status: 401 };
  }
};

export async function GET(req) {
  console.clear();
  console.log('🔄 Dev server refreshed');



  const auth = await verifyToken(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  await connectDB();
  const posts = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json({ posts, success: true });
}

export async function POST(req) {
  const body = await req.json();
  const { getPublicBlogs } = body;
  if(getPublicBlogs){
    await connectDB();
    const posts = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ posts, success: true });
  }

 
  const auth = await verifyToken(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  await connectDB();
  const {title, description} = body;

  try {
    const newPost = await Blog.create({ title, description });
    return Response.json({newPost, success:true}, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const auth = await verifyToken(req);
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

//  console.log("object Id", objectId);

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
  const auth = await verifyToken(req);
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

 

    await Blog.findOneAndDelete({ _id: objectId });
    return NextResponse.json({ message: 'Blog deleted successfully', success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting blog", error }, { status: 500 });
  }
}
      