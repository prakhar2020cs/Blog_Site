import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

// Middleware to verify JWT token

// GET function to check if email exists
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const action = searchParams.get('action');

    // If action is 'check-email', check if email exists
    if (action === 'check-email') {
      if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
      }

      const existingUser = await Admin.findOne({ email });
      return NextResponse.json({ 
        exists: !!existingUser,
        message: existingUser ? 'Email already exists' : 'Email is available'
      });
    }

    // If action is 'get-user', get user details
    if (action === 'get-user') {
      const token = request.cookies.get('token')?.value;
      
      if (!token) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Admin.findById(decoded.userId).select('-password');
        
        if (!user) {
          return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ 
          success: true,
          user: {
            id: user._id,
            email: user.email
          }
        });
      } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('GET request error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Existing POST function for registration
export async function POST(req) {
  try {
    await connectDB();
    const { userEmail, userPassword } = await req.json();
    
    // Check if user already exists
    const existingUser = await Admin.findOne({ email: userEmail });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Create new admin user
    const newAdmin = new Admin({
      email: userEmail,
      password: userPassword, // Note: In production, you should hash the password
    });

    const stored = await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: stored._id, email: stored.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the token in a cookie that's accessible to JavaScript
    const response = NextResponse.json(
      { 
        success: true, 
        message: "User registered successfully",
        token // Include token in response for debugging
      },
      { status: 201 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: false,
      sameSite: 'lax', 
      path: '/', 
      maxAge: 24 * 60 * 60, 
      secure: process.env.NODE_ENV === 'production'
    });

    return response;
  } catch (e) {
    console.error('Registration error:', e);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
