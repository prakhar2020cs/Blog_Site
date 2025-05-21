import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Post';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

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


export async function POST(req) {




  try {

    await connectDB();
    const { userEmail, userPassword } = await req.json();
    
    const stored = await Blog.findOne({ email: userEmail });
    
    if (!stored) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Verify password
    if (stored.password !== userPassword) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: stored._id, email: stored.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return NextResponse.json(
      { success:true,
        message: 'Login successful',
        token,
        user: {
          id: stored._id,
          email: stored.email
        }
      }, 
      { status: 200 }
    );
  } catch (e) {
    console.error('Login error:', e);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
